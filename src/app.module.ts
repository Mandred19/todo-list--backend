import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoItemsModule } from './todo-items/todo-items.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(
          'MONGODB_URI',
          'mongodb://127.0.0.1/todo-list',
        ),
      }),
      inject: [ConfigService],
    }),
    TodoItemsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
