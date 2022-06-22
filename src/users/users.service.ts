import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppJwtService } from '../shared/app-jwt/app-jwt.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private readonly appJwtService: AppJwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity | ConflictException> {
    const { email, password } = createUserDto;
    const candidate = await this.userRepository.findOneBy({ email });

    if (candidate) {
      throw new ConflictException(`UserEntity with email '${email}' already exist.`);
    }

    const salt = await bcrypt.genSalt(10, 'a');
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<UserEntity[] | NotFoundException> {
    return process.env.NODE_ENV === 'production'
      ? new NotFoundException('You are not get all users.')
      : this.userRepository.find();
  }

  async findOneById(id: string): Promise<UserValue> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`UserEntity with id '${id}' not found.`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<UserValue> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(`UserEntity with email '${email}' not found.`);
    }

    return user;
  }

  async update(id: string, updateDto: UpdateUserDto, authHeader: string): Promise<string> {
    const authorId = this.getAuthorId(authHeader);

    if (id !== authorId) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.update({ id }, updateDto);

    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found.`);
    }

    return id;
  }

  async remove(id: string): Promise<string> {
    const user = await this.userRepository.delete({ id });

    if (!user) {
      throw new NotFoundException(`UserEntity with id '${id}' not found.`);
    }

    return id;
  }

  private getAuthorId(authHeader: string): string {
    const token = authHeader.split(' ')[1];
    return this.appJwtService.verify(token, { secret: `${process.env.JWT_SECRET_KEY}` }).sub;
  }
}

type UserValue = UserEntity | NotFoundException;
