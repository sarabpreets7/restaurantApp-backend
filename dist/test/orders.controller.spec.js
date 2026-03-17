import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module.js';
describe('OrdersController (e2e)', () => {
    let app;
    let customerToken;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();
        app = moduleRef.createNestApplication();
        app.setGlobalPrefix('api');
        await app.init();
        const auth = await request(app.getHttpServer()).post('/api/auth/customer').send({
            name: 'test',
            phone: '000'
        });
        customerToken = auth.body.token;
    });
    afterAll(async () => {
        await app.close();
    });
    it('creates an order and fetches it', async () => {
        const menu = await request(app.getHttpServer()).get('/api/menu').expect(200);
        const item = menu.body[0];
        const createRes = await request(app.getHttpServer())
            .post('/api/orders')
            .set('Authorization', `Bearer ${customerToken}`)
            .send({
            lines: [{ menuItemId: item.id, quantity: 1 }],
            customer: { name: 'Test', phone: '123' }
        })
            .expect(201);
        const orderId = createRes.body.id;
        const getRes = await request(app.getHttpServer())
            .get(`/api/orders/${orderId}`)
            .set('Authorization', `Bearer ${customerToken}`)
            .expect(200);
        expect(getRes.body.id).toBe(orderId);
        expect(getRes.body.lines[0].menuItemId).toBe(item.id);
    });
});
