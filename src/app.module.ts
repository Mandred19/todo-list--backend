import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TodoItemsModule } from './todo-items/todo-items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

const { NODE_ENV, MONGODB_URI } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${NODE_ENV}` }),
    MongooseModule.forRoot(MONGODB_URI),
    TodoItemsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
