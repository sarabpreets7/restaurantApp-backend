var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { MenuService } from '../menu/menu.service.js';
import { OrdersGateway } from './orders.gateway.js';
import { PrismaService } from '../prisma/prisma.service.js';
const TAX_RATE = 0.09;
const allowedTransitions = {
    received: ['preparing', 'failed'],
    preparing: ['ready', 'failed'],
    ready: ['completed', 'failed'],
    completed: [],
    failed: []
};
let OrdersService = class OrdersService {
    menu;
    gateway;
    prisma;
    constructor(menu, gateway, prisma) {
        this.menu = menu;
        this.gateway = gateway;
        this.prisma = prisma;
    }
    async create(dto) {
        if (!dto.lines?.length) {
            throw new BadRequestException('Order requires at least one line item.');
        }
        const orderId = uuid();
        const shouldFailPayment = dto.mockPaymentIntent === 'force-fail';
        const now = new Date().toISOString();
        const order = await this.prisma.$transaction(async (tx) => {
            // fetch items
            const ids = dto.lines.map((l) => l.menuItemId);
            const menuItems = await tx.menuItem.findMany({ where: { id: { in: ids } } });
            const itemMap = new Map(menuItems.map((m) => [m.id, m]));
            let subtotal = 0;
            let priceChanged = false;
            const lines = dto.lines.map((line) => {
                const menuItem = itemMap.get(line.menuItemId);
                if (!menuItem || !menuItem.available) {
                    throw new BadRequestException(`Item ${line.menuItemId} is unavailable.`);
                }
                if (menuItem.stock < line.quantity) {
                    throw new BadRequestException(`Not enough stock for ${menuItem.name}.`);
                }
                const addOns = menuItem.addOns ? JSON.parse(menuItem.addOns) : [];
                const addOnTotal = line.addOnIds?.reduce((acc, id) => {
                    const addOn = addOns.find((a) => a.id === id);
                    if (!addOn)
                        throw new BadRequestException(`Invalid add-on ${id} for ${menuItem.name}`);
                    return acc + addOn.price;
                }, 0) ?? 0;
                const unitPrice = menuItem.price;
                subtotal += (unitPrice + addOnTotal) * line.quantity;
                const clientHint = dto.clientPrices?.find((c) => c.id === menuItem.id);
                if (clientHint && (clientHint.price !== menuItem.price || clientHint.stock !== menuItem.stock)) {
                    priceChanged = true;
                }
                return { ...line, unitPrice, addOnTotal };
            });
            const tax = Number((subtotal * TAX_RATE).toFixed(2));
            const total = Number((subtotal + tax).toFixed(2));
            if (priceChanged) {
                throw new BadRequestException('Menu changed since items were added. Please refresh.');
            }
            if (!shouldFailPayment) {
                // decrement stock atomically and guard against concurrent depletion
                for (const line of lines) {
                    const res = await tx.menuItem.updateMany({
                        where: { id: line.menuItemId, stock: { gte: line.quantity } },
                        data: { stock: { decrement: line.quantity } }
                    });
                    if (res.count === 0) {
                        throw new BadRequestException(`Not enough stock for ${line.menuItemId}.`);
                    }
                }
            }
            const status = shouldFailPayment ? 'failed' : 'received';
            const paymentRef = shouldFailPayment ? undefined : `pay_${uuid().slice(0, 8)}`;
            const created = await tx.order.create({
                data: {
                    id: orderId,
                    lines: JSON.stringify(lines),
                    subtotal: Number(subtotal.toFixed(2)),
                    tax,
                    total,
                    status,
                    customer: JSON.stringify(dto.customer),
                    paymentRef,
                    version: 1,
                    priceChanged
                }
            });
            return created;
        });
        const shaped = this.shapeOrder(order);
        this.gateway.publish(shaped);
        return shaped;
    }
    async list() {
        const orders = await this.prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
        return orders.map((o) => this.shapeOrder(o));
    }
    async get(id) {
        const found = await this.prisma.order.findUnique({ where: { id } });
        if (!found)
            throw new NotFoundException('Order not found');
        return this.shapeOrder(found);
    }
    async updateStatus(id, dto) {
        const current = await this.prisma.order.findUnique({ where: { id } });
        if (!current)
            throw new NotFoundException('Order not found');
        const shapedCurrent = this.shapeOrder(current);
        if (dto.version != null && dto.version !== shapedCurrent.version) {
            throw new BadRequestException('Version conflict, please refresh');
        }
        if (!allowedTransitions[shapedCurrent.status].includes(dto.status)) {
            throw new BadRequestException(`Cannot transition from ${shapedCurrent.status} to ${dto.status}`);
        }
        const updated = await this.prisma.order.update({
            where: { id },
            data: { status: dto.status, version: shapedCurrent.version + 1 }
        });
        const shaped = this.shapeOrder(updated);
        this.gateway.publish(shaped);
        return shaped;
    }
    shapeOrder(raw) {
        return {
            id: raw.id,
            status: raw.status,
            subtotal: raw.subtotal,
            tax: raw.tax,
            total: raw.total,
            customer: JSON.parse(raw.customer ?? '{}'),
            lines: JSON.parse(raw.lines ?? '[]'),
            createdAt: raw.createdAt.toISOString?.() ?? raw.createdAt,
            updatedAt: raw.updatedAt.toISOString?.() ?? raw.updatedAt,
            version: raw.version,
            paymentRef: raw.paymentRef,
            priceChanged: raw.priceChanged
        };
    }
};
OrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MenuService,
        OrdersGateway,
        PrismaService])
], OrdersService);
export { OrdersService };
