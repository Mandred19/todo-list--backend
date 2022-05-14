import { Module } from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { TodoItemsController } from './todo-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItem, TodoItemSchema } from './entities/todo-item.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: TodoItem.name, schema: TodoItemSchema }])],
  controllers: [TodoItemsController],
  providers: [TodoItemsService],
})
export class TodoItemsModule {}
