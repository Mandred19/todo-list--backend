import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req): Promise<string> {
    return this.authService.signIn(req.user);
  }

  @Post('sign-up')
  async signUp(@Request() req): Promise<any> {
    return this.authService.signUp(req.user);
  }
}
