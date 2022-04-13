import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItem, TodoItemSchema } from './schemas/todo-item.schema';
import { TodoItemsService } from './todo-items.service';
import { TodoItemsController } from './todo-items.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TodoItem.name, schema: TodoItemSchema },
    ]),
  ],
  providers: [TodoItemsService],
  controllers: [TodoItemsController],
})
export class TodoItemsModule {}
