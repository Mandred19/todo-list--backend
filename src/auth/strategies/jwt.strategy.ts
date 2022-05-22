import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_SECRET_KEY}`,
    });
  }

  async validate(payload: JwtPayload): Promise<ResponseUserDto> {
    return {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      password: '',
    };
  }
}
