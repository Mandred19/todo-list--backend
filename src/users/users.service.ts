import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AppJwtService } from '../shared/app-jwt/app-jwt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly appJwtService: AppJwtService,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | ConflictException> {
    const { email, password } = createUserDto;
    const candidate = await this.userModel.findOne({ email }).exec();

    if (candidate) {
      throw new ConflictException(`User with email '${email}' already exist.`);
    }

    const salt = await bcrypt.genSalt(10, 'a');
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new this.userModel({
      ...createUserDto,
      password: hashPassword,
    });

    return user.save();
  }

  async findAll(): Promise<User[] | NotFoundException> {
    return process.env.NODE_ENV === 'production'
      ? new NotFoundException('You are not get all users.')
      : this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<UserValue> {
    const user = await this.userModel.findById({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found.`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<UserValue> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found.`);
    }

    return user;
  }

  async update(
    id: string,
    updateDto: UpdateUserDto,
    authHeader: string,
  ): Promise<User | NotFoundException | UnauthorizedException> {
    const author = this.getAuthorId(authHeader);

    if (id !== author) {
      throw new UnauthorizedException();
    }

    const user = await this.userModel.findOneAndUpdate({ _id: id }, updateDto, { new: true }).exec();

    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found.`);
    }

    return user;
  }

  async remove(id: string): Promise<UserValue> {
    const user = await this.userModel.findByIdAndRemove({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found.`);
    }

    return user;
  }

  private getAuthorId(authHeader: string): string {
    const token = authHeader.split(' ')[1];
    return this.appJwtService.verify(token, { secret: `${process.env.JWT_SECRET_KEY}` }).sub;
  }
}

type UserValue = User | NotFoundException;
