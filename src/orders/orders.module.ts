import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { MenuModule } from '../menu/menu.module.js';
import { OrdersGateway } from './orders.gateway.js';
import { JwtAdminGuard } from '../common/jwt-admin.guard.js';
import { AuthService } from '../auth/auth.service.js';

@Module({
  imports: [MenuModule],
  providers: [OrdersService, OrdersGateway, JwtAdminGuard, AuthService],
  controllers: [OrdersController]
})
export class OrdersModule {}
