var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
let AuthService = class AuthService {
    issueAdminToken(secret, password) {
        if (!secret)
            throw new UnauthorizedException('Server misconfigured');
        if (password !== secret)
            throw new UnauthorizedException('Invalid credentials');
        const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '8h' });
        return { token };
    }
    verify(token, secret) {
        try {
            const decoded = jwt.verify(token, secret);
            return decoded.role === 'admin';
        }
        catch {
            return false;
        }
    }
    issueCustomerToken(secret, name, phone) {
        const token = jwt.sign({ role: 'customer', name, phone }, secret, { expiresIn: '7d' });
        return { token };
    }
};
AuthService = __decorate([
    Injectable()
], AuthService);
export { AuthService };
