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

  @Expose()
  readonly author: string;
}
