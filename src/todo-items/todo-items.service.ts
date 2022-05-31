import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem, TodoItemDocument } from './entities/todo-item.entity';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TodoItemsService {
  constructor(
    @InjectModel(TodoItem.name)
    private readonly todoItemModel: Model<TodoItemDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createDto: CreateTodoItemDto, headers): Promise<TodoItem> {
    const token = headers.authorization.split(' ')[1];

    const author = this.jwtService.decode(token).sub;

    const todoItem = new this.todoItemModel({ author, ...createDto });

    return todoItem.save();
  }

  async findAll(): Promise<TodoItem[]> {
    return this.todoItemModel.find().exec();
  }

  async findOne(id: string): Promise<TodoItemValue> {
    const todoItem = await this.todoItemModel.findById({ _id: id }).exec();

    if (!todoItem) {
      throw new NotFoundException('Todo item not found');
    }

    return todoItem;
  }

  async update(id: string, createDto: CreateTodoItemDto): Promise<TodoItemValue> {
    const todoItem = await this.todoItemModel.findByIdAndUpdate({ _id: id }, createDto, {
      new: true,
    });

    if (!todoItem) {
      throw new NotFoundException('Todo item not found');
    }

    return todoItem;
  }

  async remove(id: string): Promise<TodoItemValue> {
    const todoItem = await this.todoItemModel.findByIdAndRemove({ _id: id }).exec();

    if (!todoItem) {
      throw new NotFoundException('Todo item not found');
    }

    return todoItem;
  }

  async removeAll(): Promise<TodoItem[]> {
    await this.todoItemModel.remove().exec();
    return [];
  }
}

type TodoItemValue = TodoItem | NotFoundException;
