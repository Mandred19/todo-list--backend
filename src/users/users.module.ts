import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { AppJwtModule } from '../shared/app-jwt/app-jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AppJwtModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
