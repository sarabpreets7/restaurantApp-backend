var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service.js';
let JwtAdminGuard = class JwtAdminGuard {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const header = req.headers['authorization'];
        const secret = process.env.ADMIN_TOKEN;
        if (!secret)
            throw new UnauthorizedException('Admin auth not configured');
        const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
        if (token && this.auth.verify(token, secret))
            return true;
        throw new UnauthorizedException('Invalid admin token');
    }
};
JwtAdminGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthService])
], JwtAdminGuard);
export { JwtAdminGuard };
