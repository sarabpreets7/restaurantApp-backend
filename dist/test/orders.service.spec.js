import { OrdersService } from '../src/orders/orders.service.js';
import { MenuService } from '../src/menu/menu.service.js';
class MockPrisma {
    menuItems = [];
    orders = [];
    menuItem = {
        count: async () => this.menuItems.length,
        createMany: async ({ data }) => {
            this.menuItems.push(...data);
        },
        findMany: async () => this.menuItems,
        findUnique: async ({ where: { id } }) => this.menuItems.find((m) => m.id === id),
        update: async ({ where: { id }, data }) => {
            const idx = this.menuItems.findIndex((m) => m.id === id);
            if (idx >= 0)
                this.menuItems[idx] = { ...this.menuItems[idx], ...data };
            return this.menuItems[idx];
        },
        updateMany: async ({ where: { id }, data }) => {
            const idx = this.menuItems.findIndex((m) => m.id === id);
            const dec = data.stock.decrement;
            if (idx >= 0 && this.menuItems[idx].stock >= Math.abs(dec)) {
                this.menuItems[idx].stock += dec;
                return { count: 1 };
            }
            return { count: 0 };
        }
    };
    order = {
        create: async ({ data }) => {
            this.orders.push(data);
            return data;
        },
        findMany: async () => this.orders,
        findUnique: async ({ where: { id } }) => this.orders.find((o) => o.id === id),
        update: async ({ where: { id }, data }) => {
            const idx = this.orders.findIndex((o) => o.id === id);
            if (idx >= 0)
                this.orders[idx] = { ...this.orders[idx], ...data };
            return this.orders[idx];
        }
    };
    async $transaction(cb) {
        return cb(this);
    }
}
describe('OrdersService', () => {
    const gateway = {
        server: undefined,
        publish: jest.fn(),
        handleConnection: jest.fn()
    };
    let prisma;
    let menu;
    let service;
    beforeEach(() => {
        prisma = new MockPrisma();
        menu = new MenuService(prisma);
        service = new OrdersService(menu, gateway, prisma);
        prisma.menuItems = [
            {
                id: 'm1',
                name: 'Test',
                description: '',
                category: 'Main',
                price: 10,
                dietary: JSON.stringify([]),
                imageUrl: '',
                prepMinutes: 1,
                available: true,
                stock: 5,
                addOns: JSON.stringify([])
            }
        ];
    });
    it('creates an order and decreases stock', async () => {
        const menuItem = (await menu.list())[0];
        const order = await service.create({
            lines: [{ menuItemId: menuItem.id, quantity: 2 }],
            customer: { name: 'Jane', phone: '123' }
        });
        expect(order.status).toBe('received');
        const updated = await menu.get(menuItem.id);
        expect(updated?.stock).toBe(menuItem.stock - 2);
    });
    it('prevents invalid transition', async () => {
        const menuItem = (await menu.list())[0];
        const order = await service.create({
            lines: [{ menuItemId: menuItem.id, quantity: 1 }],
            customer: { name: 'Jane', phone: '123' }
        });
        await expect(service.updateStatus(order.id, {
            status: 'completed'
        })).rejects.toThrow('Cannot transition from received to completed');
    });
    it('handles forced payment failure', async () => {
        const menuItem = (await menu.list())[0];
        const beforeStock = (await menu.get(menuItem.id))?.stock || 0;
        const order = await service.create({
            lines: [{ menuItemId: menuItem.id, quantity: 1 }],
            customer: { name: 'Jake', phone: '000' },
            mockPaymentIntent: 'force-fail'
        });
        expect(order.status).toBe('failed');
        expect((await menu.get(menuItem.id))?.stock).toBe(beforeStock);
    });
});
