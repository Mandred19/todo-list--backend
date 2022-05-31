import { Module } from '@nestjs/common';
import { AppJwtService } from './app-jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      // TODO add to JWT_SECRET_KEY_EXPIRES
      signOptions: { expiresIn: process.env.NODE_ENV === 'production' ? '10m' : '3h' },
    }),
  ],
  providers: [AppJwtService],
  exports: [AppJwtService],
})
export class AppJwtModule {}
