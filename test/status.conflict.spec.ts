import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module.js';

describe('Order status version (e2e)', () => {
  let app: INestApplication;
  let customerToken: string;

  beforeAll(async () => {
    process.env.ADMIN_TOKEN = 'test-admin';
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

  it('returns 400 on version conflict', async () => {
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

    // first update with correct version using admin token (status changes are admin-guarded)
    const adminLogin = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ password: 'test-admin' })
      .expect(201);
    const adminJwt = adminLogin.body.token;

    const first = await request(app.getHttpServer())
      .patch(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminJwt}`)
      .send({ status: 'preparing', version: createRes.body.version })
      .expect(200);

    // second update with stale version should 400
    await request(app.getHttpServer())
      .patch(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminJwt}`)
      .send({ status: 'ready', version: createRes.body.version })
      .expect(400);
  });
});
