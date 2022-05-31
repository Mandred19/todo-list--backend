import { Module } from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { TodoItemsController } from './todo-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItem, TodoItemSchema } from './entities/todo-item.entity';
import { AppJwtModule } from '../shared/app-jwt/app-jwt.module';

@Module({
  imports: [AppJwtModule, MongooseModule.forFeature([{ name: TodoItem.name, schema: TodoItemSchema }])],
  controllers: [TodoItemsController],
  providers: [TodoItemsService],
})
export class TodoItemsModule {}
