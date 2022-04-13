import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoItemsModule } from './todo-items/todo-items.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/todo-list'),
    TodoItemsModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
