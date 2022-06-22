import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoItemEntity } from './entities/todo-item.entity';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { AppJwtService } from '../shared/app-jwt/app-jwt.service';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoItemsService {
  constructor(
    private readonly appJwtService: AppJwtService,
    @InjectRepository(TodoItemEntity)
    private readonly todoItemRepository: Repository<TodoItemEntity>,
  ) {}

  async create(createDto: CreateTodoItemDto, authHeader: string): Promise<TodoItemEntity> {
    const authorId = this.getAuthorId(authHeader);
    const todoItem = this.todoItemRepository.create({ author: { id: authorId }, ...createDto });
    return this.todoItemRepository.save(todoItem);
  }

  async findAll(authHeader: string): Promise<TodoItemEntity[]> {
    const authorId = this.getAuthorId(authHeader);
    return this.todoItemRepository.find({ where: { author: { id: authorId } }, relations: { author: true } });
  }

  async findOne(id: string, authHeader: string): Promise<TodoItemEntity | NotFoundException> {
    const authorId = this.getAuthorId(authHeader);
    const todoItem = await this.todoItemRepository.findOne({
      where: { id, author: { id: authorId } },
      relations: { author: true },
    });

    if (!todoItem) {
      throw new NotFoundException(`Todo item with id '${id}' not found.`);
    }

    return todoItem;
  }

  async update(id: string, updateDto: UpdateTodoItemDto, authHeader: string): Promise<string> {
    const authorId = this.getAuthorId(authHeader);
    const todoItem = await this.todoItemRepository.update({ id, author: { id: authorId } }, updateDto);

    if (!todoItem) {
      throw new NotFoundException(`Todo item with id '${id}' not found.`);
    }

    return id;
  }

  async remove(id: string, authHeader: string): Promise<string> {
    const authorId = this.getAuthorId(authHeader);
    const todoItem = await this.todoItemRepository.delete({ id, author: { id: authorId } });

    if (!todoItem) {
      throw new NotFoundException(`Todo item with id '${id}' not found.`);
    }

    return id;
  }

  async removeAll(authHeader: string): Promise<TodoItemEntity[]> {
    const authorId = this.getAuthorId(authHeader);
    await this.todoItemRepository.delete({ author: { id: authorId } });
    return [];
  }

  private getAuthorId(authHeader: string): string {
    const token = authHeader.split(' ')[1];
    return this.appJwtService.verify(token, { secret: `${process.env.JWT_SECRET_KEY}` }).sub;
  }
}
