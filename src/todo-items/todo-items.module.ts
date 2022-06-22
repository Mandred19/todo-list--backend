import { Module } from '@nestjs/common';
import { TodoItemsService } from './todo-items.service';
import { TodoItemsController } from './todo-items.controller';
import { TodoItemEntity } from './entities/todo-item.entity';
import { AppJwtModule } from '../shared/app-jwt/app-jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AppJwtModule, TypeOrmModule.forFeature([TodoItemEntity])],
  controllers: [TodoItemsController],
  providers: [TodoItemsService],
})
export class TodoItemsModule {}
