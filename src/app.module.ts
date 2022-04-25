import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TodoItemsModule } from './todo-items/todo-items.module';

const { NODE_ENV, MONGODB_URI } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      NODE_ENV === 'production' ? MONGODB_URI : 'mongodb://127.0.0.1/todo-list',
    ),
    TodoItemsModule,
  ],
})
export class AppModule {}
