import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service.js';

@Injectable()
export class JwtAdminGuard implements CanActivate {
  constructor(private readonly auth: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const header = req.headers['authorization'] as string | undefined;
    const secret = process.env.ADMIN_TOKEN;
    if (!secret) throw new UnauthorizedException('Admin auth not configured');
    const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
    if (token && this.auth.verify(token, secret)) return true;
    throw new UnauthorizedException('Invalid admin token');
  }
}
