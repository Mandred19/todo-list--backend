import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { TodoItem } from './schemas/todo-item.schema';
import { TodoItemDto } from './dto/todo-item.dto';

@Controller('list')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Get('items')
  async findAll(): Promise<TodoItem[]> {
    return this.todoItemsService.findAll();
  }

  @Get('items/:id')
  async findOne(@Param('id') id: string): Promise<TodoItem> {
    return this.todoItemsService.findOne(id);
  }

  @Post('items')
  async create(@Body() todoItemDto: TodoItemDto): Promise<TodoItem> {
    return this.todoItemsService.create(todoItemDto);
  }

  @Put('items/:id')
  async update(
    @Param('id') id: string,
    @Body() todoItemDto: TodoItemDto,
  ): Promise<TodoItem> {
    return this.todoItemsService.update(id, todoItemDto);
  }

  @Delete('items/:id')
  async delete(@Param('id') id: string): Promise<TodoItem> {
    return this.todoItemsService.delete(id);
  }
}
