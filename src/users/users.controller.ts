import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserInterceptor } from './interceptors/user.interceptor';
import { CreateUserDto } from './dto/create-user.dto';

@UseInterceptors(UserInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User | ConflictException> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[] | NotFoundException> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): Promise<User | NotFoundException> {
    return this.usersService.findOneById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User | NotFoundException> {
    return this.usersService.remove(id);
  }
}
