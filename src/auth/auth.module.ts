import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

const { MODE_ENV, JWT_SECRET_KEY } = process.env;

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret:
        MODE_ENV === 'production' ? JWT_SECRET_KEY : constants.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
