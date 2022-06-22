import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { ResponseUserDto } from '../users/dto/response-user.dto';
import { AppJwtService } from '../shared/app-jwt/app-jwt.service';

@Injectable()
export class AuthService {
  constructor(private readonly appJwtService: AppJwtService, private readonly usersService: UsersService) {}

  async signIn(user: ResponseUserDto): Promise<ResponseAuthDto> {
    const accessToken = await this.createToken(user);

    return {
      accessToken,
      payload: user,
    };
  }

  async validateUser(email: string, password: string): Promise<UserEntity | BadRequestException> {
    const user = await this.usersService.findOneByEmail(email);

    let isPasswordValid = false;

    if (!(user instanceof NotFoundException)) {
      isPasswordValid = await bcrypt.compare(password, user.password);
    }

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }

  private async createToken(user: ResponseUserDto): Promise<string> {
    const { id, createdAt, updatedAt } = user;

    return this.appJwtService.signAsync(
      {
        sub: id,
        createdAt,
        updatedAt,
      },
      { secret: `${process.env.JWT_SECRET_KEY}` },
    );
  }
}
