import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | HttpException> {
    const { email, password } = createUserDto;
    const candidate = await this.userModel.findOne({ email }).exec();

    if (candidate) {
      return new ConflictException(`User with email ${email} already exist`);
    }

    const salt = await bcrypt.genSalt(10, 'a');
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new this.userModel({
      ...createUserDto,
      password: hashPassword,
    });

    return user.save();
  }

  // TODO delete
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<any> {
    return this.userModel.findByIdAndRemove({ _id: id }).exec();
  }
}
