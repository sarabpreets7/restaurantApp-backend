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
    constructor(menu, gateway) {
        this.menu = menu;
        this.gateway = gateway;
    }
    orders = new Map();
    create(dto) {
        if (!dto.lines?.length) {
            throw new BadRequestException('Order requires at least one line item.');
        }
        const now = new Date().toISOString();
        let subtotal = 0;
        const lines = dto.lines.map((line) => {
            const menuItem = this.menu.get(line.menuItemId);
            if (!menuItem || !menuItem.available) {
                throw new BadRequestException(`Item ${line.menuItemId} is unavailable.`);
            }
            if (menuItem.stock < line.quantity) {
                throw new BadRequestException(`Not enough stock for ${menuItem.name}.`);
            }
            const addOnTotal = line.addOnIds?.reduce((acc, id) => {
                const addOn = menuItem.addOns?.find((a) => a.id === id);
                if (!addOn)
                    throw new BadRequestException(`Invalid add-on ${id} for ${menuItem.name}`);
                return acc + addOn.price;
            }, 0) ?? 0;
            const unitPrice = menuItem.price;
            subtotal += (unitPrice + addOnTotal) * line.quantity;
            return { ...line, unitPrice, addOnTotal };
        });
        const tax = Number((subtotal * TAX_RATE).toFixed(2));
        const total = Number((subtotal + tax).toFixed(2));
        const id = uuid();
        const shouldFailPayment = dto.mockPaymentIntent === 'force-fail';
        const status = shouldFailPayment ? 'failed' : 'received';
        const paymentRef = shouldFailPayment ? undefined : `pay_${uuid().slice(0, 8)}`;
        if (!shouldFailPayment) {
            // reduce stock only on successful payment
            lines.forEach((line) => this.menu.adjustStock(line.menuItemId, -line.quantity));
        }
        const order = {
            id,
            lines,
            subtotal: Number(subtotal.toFixed(2)),
            tax,
            total,
            status,
            createdAt: now,
            updatedAt: now,
            customer: dto.customer,
            version: 1,
            priceChanged: false,
            paymentRef
        };
        this.orders.set(id, order);
        this.gateway.publish(order);
        return order;
    }
    list() {
        return Array.from(this.orders.values()).sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
    }
    get(id) {
        const found = this.orders.get(id);
        if (!found)
            throw new NotFoundException('Order not found');
        return found;
    }
    updateStatus(id, dto) {
        const current = this.get(id);
        if (!allowedTransitions[current.status].includes(dto.status)) {
            throw new BadRequestException(`Cannot transition from ${current.status} to ${dto.status}`);
        }
        const updated = {
            ...current,
            status: dto.status,
            updatedAt: new Date().toISOString(),
            version: current.version + 1
        };
        this.orders.set(id, updated);
        this.gateway.publish(updated);
        return updated;
    }
};
OrdersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MenuService, OrdersGateway])
], OrdersService);
export { OrdersService };
