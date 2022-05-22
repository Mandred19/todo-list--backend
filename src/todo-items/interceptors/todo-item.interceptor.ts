import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { TodoItem } from '../entities/todo-item.entity';
import { ResponseTodoItemDto } from '../dto/response-todo-item.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TodoItemInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = { excludeExtraneousValues: true, excludePrefixes: ['_', '__'] };

    return next.handle().pipe(
      map((todoItem: TodoItem): ResponseTodoItemDto => plainToInstance(ResponseTodoItemDto, todoItem, options)),
    );
  }
}
