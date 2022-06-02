import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Headers,
  NotFoundException,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserInterceptor } from './interceptors/user.interceptor';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOneById(@Param('id') id: string): Promise<UserValue> {
    return this.usersService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
    @Headers('authorization') header: string,
  ): Promise<User | NotFoundException | UnauthorizedException> {
    return this.usersService.update(id, updateDto, header);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserValue> {
    return this.usersService.remove(id);
  }
}

type UserValue = User | NotFoundException;
