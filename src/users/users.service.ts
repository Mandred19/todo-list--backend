import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | ConflictException> {
    const { email, password } = createUserDto;
    const candidate = await this.userModel.findOne({ email }).exec();

    if (candidate) {
      throw new ConflictException(`User with email '${email}' already exist`);
    }

    const salt = await bcrypt.genSalt(10, 'a');
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new this.userModel({
      ...createUserDto,
      password: hashPassword,
    });

    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(id: string): Promise<User | NotFoundException> {
    const user = await this.userModel.findById({ _id: id }).exec();

    if (!user) {
      return new NotFoundException(`User with '${id}' not found.`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User | NotFoundException> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      return new NotFoundException(`User with email '${email}' not found.`);
    }

    return user;
  }
}
