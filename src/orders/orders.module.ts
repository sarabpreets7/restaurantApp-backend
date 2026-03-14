import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { MenuModule } from '../menu/menu.module.js';
import { OrdersGateway } from './orders.gateway.js';

@Module({
  imports: [MenuModule],
  providers: [OrdersService, OrdersGateway],
  controllers: [OrdersController]
})
export class OrdersModule {}
