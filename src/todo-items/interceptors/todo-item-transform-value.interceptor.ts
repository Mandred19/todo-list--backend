import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TodoItemTransformValueInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ITodoItemsResponseValue> {
    return next.handle().pipe(
      map((item): ITodoItemsResponseValue => {
        return transformTodoItemValueResponse(item);
      }),
    );
  }
}

function transformTodoItemValueResponse(response): ITodoItemsResponseValue {
  return {
    id: response._id,
    title: response.title,
    description: response.description,
    createdDate: response.createdDate,
    updatedDate: response.updatedDate,
    isComplete: response.isComplete,
    isFavorite: response.isFavorite,
  };
}

interface ITodoItemsResponseValue {
  id: string;
  title: string;
  description: string;
  createdDate: Date;
  updatedDate: Date;
  isComplete: boolean;
  isFavorite: boolean;
}
