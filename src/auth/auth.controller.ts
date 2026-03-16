import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  login(@Body() body: { password: string }) {
    const secret = process.env.ADMIN_TOKEN;
    if (!secret) throw new UnauthorizedException('Admin auth not configured');
    return this.auth.issueAdminToken(secret, body.password);
  }

  @Post('customer')
  customer(@Body() body: { name?: string; phone?: string }) {
    const secret = process.env.ADMIN_TOKEN;
    if (!secret) throw new UnauthorizedException('Admin auth not configured');
    return this.auth.issueCustomerToken(secret, body.name ?? 'guest', body.phone ?? '000');
  }
}
