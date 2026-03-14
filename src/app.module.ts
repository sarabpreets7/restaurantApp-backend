import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module.js';
import { MenuModule } from './menu/menu.module.js';
import { HealthController } from './common/health.controller.js';

@Module({
  imports: [MenuModule, OrdersModule],
  controllers: [HealthController]
})
export class AppModule {}
