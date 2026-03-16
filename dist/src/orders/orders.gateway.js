var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
let OrdersGateway = class OrdersGateway {
    server;
    publish(order) {
        if (!this.server)
            return;
        this.server.to(order.id).emit('order.updated', order);
        this.server.emit('admin.orders', order);
    }
    handleConnection(socket) {
        const orderId = socket.handshake.query.orderId;
        if (orderId) {
            socket.join(orderId);
        }
    }
};
__decorate([
    WebSocketServer(),
    __metadata("design:type", Server)
], OrdersGateway.prototype, "server", void 0);
OrdersGateway = __decorate([
    WebSocketGateway({
        cors: true,
        namespace: '/ws/orders'
    })
], OrdersGateway);
export { OrdersGateway };
