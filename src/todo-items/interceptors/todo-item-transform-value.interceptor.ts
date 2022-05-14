import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ITodoItemsResponseValue, transformTodoItemValueResponse } from './utils/transformTodoItemValueResponse';

@Injectable()
export class TodoItemTransformValueInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ITodoItemsResponseValue> {
    return next.handle().pipe(map((item): ITodoItemsResponseValue => transformTodoItemValueResponse(item)));
  }
}
