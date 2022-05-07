import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { TodoItem } from './entities/todo-item.entity';

@Controller('list')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Get()
  async findAll(): Promise<TodoItem[]> {
    return this.todoItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TodoItem> {
    return this.todoItemsService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateTodoItemDto): Promise<TodoItem> {
    return this.todoItemsService.create(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() createDto: CreateTodoItemDto,
  ): Promise<TodoItem> {
    return this.todoItemsService.update(id, createDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<TodoItem> {
    return this.todoItemsService.remove(id);
  }

  @Delete()
  async removeAll(): Promise<any> {
    return this.todoItemsService.removeAll();
  }
}
