import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodoItemsModule } from './todo-items/todo-items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { TodoItemEntity } from './todo-items/entities/todo-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_USER_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, TodoItemEntity],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    TodoItemsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
