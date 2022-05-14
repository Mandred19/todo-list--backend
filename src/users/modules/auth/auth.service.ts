import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users.service';
import { User } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async signIn(user: User): Promise<string> {
    const payload = {
      name: user.name,
      email: user.email,
    };

    return this.jwtService.signAsync(payload);
  }

  async signUp(user: any): Promise<any> {
    return user;
  }

  async validate(email: string, password: string): Promise<User | HttpException> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      return new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new BadRequestException('Invalid password');
    }

    return user;
  }
}
