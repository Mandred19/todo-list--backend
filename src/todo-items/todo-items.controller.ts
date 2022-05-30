import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  UseInterceptors,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { TodoItem } from './entities/todo-item.entity';
import { TodoItemInterceptor } from './interceptors/todo-item.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseInterceptors(TodoItemInterceptor)
@Controller('list')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Get()
  findAll(): Promise<TodoItem[]> {
    return this.todoItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TodoItemValue> {
    return this.todoItemsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDto: CreateTodoItemDto, @Headers() headers): Promise<TodoItem> {
    return this.todoItemsService.create(createDto, headers);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createDto: CreateTodoItemDto): Promise<TodoItemValue> {
    return this.todoItemsService.update(id, createDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<TodoItemValue> {
    return this.todoItemsService.remove(id);
  }

  @Delete()
  removeAll(): Promise<TodoItem[]> {
    return this.todoItemsService.removeAll();
  }
}

type TodoItemValue = TodoItem | NotFoundException;
