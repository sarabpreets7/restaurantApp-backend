import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module.js';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.ADMIN_TOKEN = 'test-admin';
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('issues customer token', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/customer')
      .send({ name: 'Cust', phone: '000' })
      .expect(201);
    expect(res.body.token).toBeDefined();
  });

  it('rejects invalid admin login', async () => {
    await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ password: 'wrong' })
      .expect(401);
  });

  it('accepts valid admin login', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ password: 'test-admin' })
      .expect(201);
    expect(res.body.token).toBeDefined();
  });
});
