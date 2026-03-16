import { OrdersService } from '../src/orders/orders.service.js';
import { MenuService } from '../src/menu/menu.service.js';
describe('OrdersService', () => {
    const gateway = {
        server: undefined,
        publish: jest.fn(),
        handleConnection: jest.fn()
    };
    let menu;
    let service;
    beforeEach(() => {
        menu = new MenuService();
        service = new OrdersService(menu, gateway);
    });
    it('creates an order and decreases stock', () => {
        const menuItem = menu.list()[0];
        const order = service.create({
            lines: [{ menuItemId: menuItem.id, quantity: 2 }],
            customer: { name: 'Jane', phone: '123' }
        });
        expect(order.status).toBe('received');
        expect(menu.get(menuItem.id)?.stock).toBe(menuItem.stock - 2);
    });
    it('prevents invalid transition', () => {
        const menuItem = menu.list()[0];
        const order = service.create({
            lines: [{ menuItemId: menuItem.id, quantity: 1 }],
            customer: { name: 'Jane', phone: '123' }
        });
        expect(() => service.updateStatus(order.id, {
            status: 'completed'
        })).toThrow('Cannot transition from received to completed');
    });
    it('handles forced payment failure', () => {
        const menuItem = menu.list()[0];
        const beforeStock = menu.get(menuItem.id)?.stock || 0;
        const order = service.create({
            lines: [{ menuItemId: menuItem.id, quantity: 1 }],
            customer: { name: 'Jake', phone: '000' },
            mockPaymentIntent: 'force-fail'
        });
        expect(order.status).toBe('failed');
        expect(menu.get(menuItem.id)?.stock).toBe(beforeStock); // stock unchanged
    });
});
