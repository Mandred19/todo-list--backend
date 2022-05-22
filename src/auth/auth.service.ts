import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ResponseAuthDto } from './dto/response-auth.dto';
import { ResponseUserDto } from '../users/dto/response-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  async signIn(user: ResponseUserDto): Promise<ResponseAuthDto> {
    const token = await this.createToken(user);

    return {
      token,
      user,
    };
  }

  async validateUser(email: string, password: string): Promise<User | BadRequestException> {
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
    const { id, name, email, createdAt, updatedAt } = user;

    return this.jwtService.signAsync({
      id,
      name,
      email,
      createdAt,
      updatedAt,
    });
  }
}
