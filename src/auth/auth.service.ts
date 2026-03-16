import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  issueAdminToken(secret: string, password: string): { token: string } {
    if (!secret) throw new UnauthorizedException('Server misconfigured');
    if (password !== secret) throw new UnauthorizedException('Invalid credentials');
    const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '8h' });
    return { token };
  }

  verify(token: string, secret: string): boolean {
    try {
      const decoded = jwt.verify(token, secret) as any;
      return decoded.role === 'admin';
    } catch {
      return false;
    }
  }

  issueCustomerToken(secret: string, name: string, phone: string) {
    const token = jwt.sign({ role: 'customer', name, phone }, secret, { expiresIn: '7d' });
    return { token };
  }
}
