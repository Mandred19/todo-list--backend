import { Controller, Post, UseGuards, Request, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { AuthResponseInterceptor } from './interceptors/auth-response.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(AuthResponseInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req): Promise<ResponseAuthDto> {
    return this.authService.signIn(req.user);
  }
}
