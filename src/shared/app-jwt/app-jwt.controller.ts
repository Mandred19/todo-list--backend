import { Controller, Get } from '@nestjs/common';
import { AppJwtService } from './app-jwt.service';

@Controller()
export class AppJwtController {
  constructor(private readonly appJwtService: AppJwtService) {}

  @Get('token')
  async getAccessToken(): Promise<string> {
    return this.appJwtService.getAccessToken();
  }

  @Get('refresh-token')
  async getRefreshToken(): Promise<string> {
    return this.appJwtService.getRefreshToken();
  }
}
