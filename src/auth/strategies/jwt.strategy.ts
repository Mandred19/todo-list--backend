import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { constants } from '../constants';

const { MODE_ENV, JWT_SECRET_KEY } = process.env;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        MODE_ENV === 'production' ? JWT_SECRET_KEY : constants.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return {
      _id: payload.sub,
      name: payload.name,
      email: payload.email,
    };
  }
}
