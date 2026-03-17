import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module.js';
describe('MenuController (e2e)', () => {
    let app;
    beforeAll(async () => {
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
    it('returns menu items', async () => {
        const res = await request(app.getHttpServer()).get('/api/menu').expect(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it('filters by category', async () => {
        const res = await request(app.getHttpServer())
            .get('/api/menu')
            .query({ category: 'Appetizers' })
            .expect(200);
        expect(res.body.every((i) => i.category === 'Appetizers')).toBe(true);
    });
});
