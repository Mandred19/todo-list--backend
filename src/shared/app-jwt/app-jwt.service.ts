import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: string | Buffer | object, options?: JwtSignOptions): string {
    return this.jwtService.sign(payload, options);
  }

  async signAsync(payload: string | Buffer | object, options?: JwtSignOptions): Promise<string> {
    return this.jwtService.signAsync(payload, options);
  }

  verify<T extends object = any>(token: string, options?: JwtVerifyOptions): T {
    return this.jwtService.verify(token, options);
  }

  verifyAsync<T extends object = any>(token: string, options?: JwtVerifyOptions): Promise<T> {
    return this.jwtService.verifyAsync(token, options);
  }

  decode(token: string, options?: jwt.DecodeOptions): null | { [key: string]: any } | string {
    return this.jwtService.decode(token, options);
  }
}
