import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem, TodoItemDocument } from './entities/todo-item.entity';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';

@Injectable()
export class TodoItemsService {
  constructor(
    @InjectModel(TodoItem.name)
    private todoItemModel: Model<TodoItemDocument>,
  ) {}

  async create(createDto: CreateTodoItemDto): Promise<TodoItem> {
    const todoItem = new this.todoItemModel(createDto);
    return todoItem.save();
  }

  async findAll(): Promise<TodoItem[]> {
    return this.todoItemModel.find().exec();
  }

  async findOne(id: string): Promise<TodoItem> {
    return this.todoItemModel.findById({ _id: id }).exec();
  }

  async update(id: string, createDto: CreateTodoItemDto): Promise<TodoItem> {
    return this.todoItemModel.findByIdAndUpdate({ _id: id }, createDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<any> {
    return this.todoItemModel.findByIdAndRemove({ _id: id }).exec();
  }
}
