import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.headers['x-admin-token'] as string | undefined;
    const expected = process.env.ADMIN_TOKEN;
    if (!expected || token === expected) return true;
    throw new UnauthorizedException('Admin token invalid');
  }
}
