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
@UseGuards(JwtAuthGuard)
@Controller('list')
export class TodoItemsController {
  constructor(private readonly todoItemsService: TodoItemsService) {}

  @Get()
  findAll(@Headers('authorization') header: string): Promise<TodoItem[]> {
    return this.todoItemsService.findAll(header);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('authorization') header: string): Promise<TodoItemValue> {
    return this.todoItemsService.findOne(id, header);
  }

  @Post()
  create(@Body() createDto: CreateTodoItemDto, @Headers('authorization') header: string): Promise<TodoItem> {
    return this.todoItemsService.create(createDto, header);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createDto: CreateTodoItemDto,
    @Headers('authorization') header: string,
  ): Promise<TodoItemValue> {
    return this.todoItemsService.update(id, createDto, header);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('authorization') header: string): Promise<TodoItemValue> {
    return this.todoItemsService.remove(id, header);
  }

  @Delete()
  removeAll(@Headers('authorization') header: string): Promise<TodoItem[]> {
    return this.todoItemsService.removeAll(header);
  }
}

type TodoItemValue = TodoItem | NotFoundException;
