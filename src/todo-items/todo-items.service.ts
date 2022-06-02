import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoItem, TodoItemDocument } from './entities/todo-item.entity';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { AppJwtService } from '../shared/app-jwt/app-jwt.service';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';

@Injectable()
export class TodoItemsService {
  constructor(
    private readonly appJwtService: AppJwtService,
    @InjectModel(TodoItem.name)
    private readonly todoItemModel: Model<TodoItemDocument>,
  ) {}

  async create(createDto: CreateTodoItemDto, authHeader: string): Promise<TodoItem> {
    const author = this.getAuthorId(authHeader);
    const todoItem = new this.todoItemModel({ author, ...createDto });
    return todoItem.save();
  }

  async findAll(authHeader: string): Promise<TodoItem[]> {
    const author = this.getAuthorId(authHeader);
    return this.todoItemModel.find({ author }).exec();
  }

  async findOne(id: string, authHeader: string): Promise<TodoItemValue> {
    const author = this.getAuthorId(authHeader);
    const todoItem = await this.todoItemModel.findOne({ _id: id, author }).exec();

    if (!todoItem) {
      throw new NotFoundException(`Todo item with id '${id}' not found.`);
    }

    return todoItem;
  }

  async update(id: string, updateDto: UpdateTodoItemDto, authHeader: string): Promise<TodoItemValue> {
    const author = this.getAuthorId(authHeader);
    const todoItem = await this.todoItemModel.findOneAndUpdate({ _id: id, author }, updateDto, { new: true }).exec();

    if (!todoItem) {
      throw new NotFoundException(`Todo item with id '${id}' not found.`);
    }

    return todoItem;
  }

  async remove(id: string, authHeader: string): Promise<TodoItemValue> {
    const author = this.getAuthorId(authHeader);
    const todoItem = await this.todoItemModel.findOneAndRemove({ _id: id, author }).exec();

    if (!todoItem) {
      throw new NotFoundException(`Todo item with id '${id}' not found.`);
    }

    return todoItem;
  }

  async removeAll(authHeader: string): Promise<TodoItem[]> {
    const author = this.getAuthorId(authHeader);
    await this.todoItemModel.remove({ author }).exec();
    return [];
  }

  private getAuthorId(authHeader: string): string {
    const token = authHeader.split(' ')[1];
    return this.appJwtService.verify(token, { secret: `${process.env.JWT_SECRET_KEY}` }).sub;
  }
}

type TodoItemValue = TodoItem | NotFoundException;
