import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { MenuService } from '../menu/menu.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateStatusDto } from './dto/update-status.dto.js';
import { LineItem, Order, OrderStatus } from '../common/types.js';
import { OrdersGateway } from './orders.gateway.js';

const TAX_RATE = 0.09;
const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  received: ['preparing', 'failed'],
  preparing: ['ready', 'failed'],
  ready: ['completed', 'failed'],
  completed: [],
  failed: []
};

@Injectable()
export class OrdersService {
  constructor(private readonly menu: MenuService, private readonly gateway: OrdersGateway) {}

  private orders = new Map<string, Order>();

  create(dto: CreateOrderDto): Order {
    if (!dto.lines?.length) {
      throw new BadRequestException('Order requires at least one line item.');
    }

    const now = new Date().toISOString();
    let subtotal = 0;
    const lines: Array<LineItem & { unitPrice: number; addOnTotal: number }> = dto.lines.map(
      (line) => {
        const menuItem = this.menu.get(line.menuItemId);
        if (!menuItem || !menuItem.available) {
          throw new BadRequestException(`Item ${line.menuItemId} is unavailable.`);
        }
        if (menuItem.stock < line.quantity) {
          throw new BadRequestException(`Not enough stock for ${menuItem.name}.`);
        }
        const addOnTotal =
          line.addOnIds?.reduce((acc, id) => {
            const addOn = menuItem.addOns?.find((a) => a.id === id);
            if (!addOn) throw new BadRequestException(`Invalid add-on ${id} for ${menuItem.name}`);
            return acc + addOn.price;
          }, 0) ?? 0;

        const unitPrice = menuItem.price;
        subtotal += (unitPrice + addOnTotal) * line.quantity;
        return { ...line, unitPrice, addOnTotal };
      }
    );

    const tax = Number((subtotal * TAX_RATE).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));
    const id = uuid();

    const shouldFailPayment = dto.mockPaymentIntent === 'force-fail';
    const status: OrderStatus = shouldFailPayment ? 'failed' : 'received';
    const paymentRef = shouldFailPayment ? undefined : `pay_${uuid().slice(0, 8)}`;

    if (!shouldFailPayment) {
      // reduce stock only on successful payment
      lines.forEach((line) => this.menu.adjustStock(line.menuItemId, -line.quantity));
    }

    const order: Order = {
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

  list(): Order[] {
    return Array.from(this.orders.values()).sort((a, b) =>
      a.createdAt > b.createdAt ? -1 : 1
    );
  }

  get(id: string): Order {
    const found = this.orders.get(id);
    if (!found) throw new NotFoundException('Order not found');
    return found;
  }

  updateStatus(id: string, dto: UpdateStatusDto): Order {
    const current = this.get(id);
    if (!allowedTransitions[current.status].includes(dto.status)) {
      throw new BadRequestException(`Cannot transition from ${current.status} to ${dto.status}`);
    }
    const updated: Order = {
      ...current,
      status: dto.status,
      updatedAt: new Date().toISOString(),
      version: current.version + 1
    };
    this.orders.set(id, updated);
    this.gateway.publish(updated);
    return updated;
  }
}
