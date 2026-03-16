import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true
    })
  );
  const port = process.env.PORT ? Number(process.env.PORT) : 4000;
  await app.listen(port, '127.0.0.1');
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://127.0.0.1:${port}/api`);
}

bootstrap();
