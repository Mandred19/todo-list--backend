import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem, TodoItemDocument } from './schemas/todo-item.schema';
import { TodoItemDto } from './dto/todo-item.dto';

@Injectable()
export class TodoItemsService {
  constructor(
    @InjectModel(TodoItem.name)
    private todoItemModel: Model<TodoItemDocument>,
  ) {}

  async findAll(): Promise<TodoItem[]> {
    return this.todoItemModel.find().exec();
  }

  async findOne(id: string): Promise<TodoItem> {
    return this.todoItemModel.findById({ _id: id }).exec();
  }

  async create(todoItemDto: TodoItemDto): Promise<TodoItem> {
    const todoItem = new this.todoItemModel(todoItemDto);
    return todoItem.save();
  }

  async update(id: string, todoItemDto: TodoItemDto): Promise<TodoItem> {
    const todoItem = await this.todoItemModel.findByIdAndUpdate(
      { _id: id },
      todoItemDto,
      { new: true },
    );
    return todoItem;
  }

  async delete(id: string): Promise<any> {
    const todoItem = await this.todoItemModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return todoItem;
  }
}
