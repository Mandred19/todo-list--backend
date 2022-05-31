import { Module } from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { TodoItemsController } from './todo-items.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItem, TodoItemSchema } from './entities/todo-item.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoItem.name, schema: TodoItemSchema }]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}`,
      // TODO add to JWT_SECRET_KEY_EXPIRES
      signOptions: { expiresIn: process.env.NODE_ENV === 'production' ? '10m' : '3h' },
    }),
  ],
  controllers: [TodoItemsController],
  providers: [TodoItemsService],
})
export class TodoItemsModule {}
