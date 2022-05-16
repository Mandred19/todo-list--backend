import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ITodoItemsResponseValue, transformTodoItemValueResponse } from './utils/transformTodoItemValueResponse';

@Injectable()
export class TodoItemsListTransformValueInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ITodoItemsResponseValue[]> {
    return next
      .handle()
      .pipe(map((list): ITodoItemsResponseValue[] => list.map((listItem) => transformTodoItemValueResponse(listItem))));
  }
}
