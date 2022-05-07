import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(user: User): Promise<string> {
    const payload = {
      sub: user._id,
      name: user.name,
      email: user.email,
    };

    return this.jwtService.signAsync(payload);
  }

  async signUp(user: any): Promise<any> {
    return user;
  }

  async validate(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOne(email);

    if (user && user.password === pass) {
      return user;
    }

    return null;
  }
}
