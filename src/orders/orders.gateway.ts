import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import type { Order } from '../common/types.js';

@WebSocketGateway({
  cors: true,
  namespace: '/ws/orders'
})
export class OrdersGateway {
  @WebSocketServer()
  server!: Server;

  publish(order: Order) {
    if (!this.server) return;
    this.server.to(order.id).emit('order.updated', order);
    this.server.emit('admin.orders', order);
  }

  handleConnection(socket: any) {
    const orderId = socket.handshake.query.orderId as string | undefined;
    if (orderId) {
      socket.join(orderId);
    }
  }
}
