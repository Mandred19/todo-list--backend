import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, NotFoundException } from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { TodoItem } from './entities/todo-item.entity';
import { TodoItemTransformValueInterceptor } from './interceptors/todo-item-transform-value.interceptor';
import { TodoItemsListTransformValueInterceptor } from './interceptors/todo-items-list-transform-value.interceptor';

@Controller('list')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Get()
  @UseInterceptors(TodoItemsListTransformValueInterceptor)
  findAll(): Promise<TodoItem[]> {
    return this.todoItemsService.findAll();
  }

  @Get(':id')
  @UseInterceptors(TodoItemTransformValueInterceptor)
  findOne(@Param('id') id: string): Promise<TodoItemValue> {
    return this.todoItemsService.findOne(id);
  }

  @Post()
  @UseInterceptors(TodoItemTransformValueInterceptor)
  create(@Body() createDto: CreateTodoItemDto): Promise<TodoItem> {
    return this.todoItemsService.create(createDto);
  }

  @Put(':id')
  @UseInterceptors(TodoItemTransformValueInterceptor)
  update(@Param('id') id: string, @Body() createDto: CreateTodoItemDto): Promise<TodoItemValue> {
    return this.todoItemsService.update(id, createDto);
  }

  @Delete(':id')
  @UseInterceptors(TodoItemTransformValueInterceptor)
  remove(@Param('id') id: string): Promise<TodoItemValue> {
    return this.todoItemsService.remove(id);
  }

  @Delete()
  removeAll(): Promise<TodoItem[]> {
    return this.todoItemsService.removeAll();
  }
}

type TodoItemValue = TodoItem | NotFoundException;
