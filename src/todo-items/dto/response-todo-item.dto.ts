import { Expose } from 'class-transformer';

export class ResponseTodoItemDto {
  @Expose()
  id: string;

  @Expose()
  readonly title: string;

  @Expose()
  readonly description?: string;

  @Expose()
  readonly isComplete: boolean;

  @Expose()
  readonly isFavorite: boolean;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;

  // TODO add author data to todo-item response
  // @Expose()
  // readonly author: string;
}
