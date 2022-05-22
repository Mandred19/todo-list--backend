import { Controller, Get, NotFoundException, Param, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserInterceptor } from './interceptors/user.interceptor';

@UseInterceptors(UserInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<User | NotFoundException> {
    return this.usersService.findOneById(id);
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string): Promise<User | NotFoundException> {
    return this.usersService.findOneByEmail(email);
  }
}
