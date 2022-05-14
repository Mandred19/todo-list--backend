import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem, TodoItemDocument } from './entities/todo-item.entity';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';

@Injectable()
export class TodoItemsService {
  constructor(
    @InjectModel(TodoItem.name)
    private readonly todoItemModel: Model<TodoItemDocument>,
  ) {}

  async create(createDto: CreateTodoItemDto): Promise<TodoItem> {
    const todoItem = new this.todoItemModel(createDto);
    return todoItem.save();
  }

  async findAll(): Promise<TodoItem[]> {
    return this.todoItemModel.find().exec();
  }

  async findOne(id: string): Promise<TodoItemValue> {
    const user = await this.todoItemModel.findById({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, createDto: CreateTodoItemDto): Promise<TodoItemValue> {
    const user = await this.todoItemModel.findByIdAndUpdate({ _id: id }, createDto, {
      new: true,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async remove(id: string): Promise<TodoItemValue> {
    const user = await this.todoItemModel.findByIdAndRemove({ _id: id }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async removeAll(): Promise<TodoItem[]> {
    await this.todoItemModel.remove().exec();
    return [];
  }
}

type TodoItemValue = TodoItem | NotFoundException;
