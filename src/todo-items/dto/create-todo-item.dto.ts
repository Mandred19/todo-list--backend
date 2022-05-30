import { Length, IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class CreateTodoItemDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 180)
  readonly title: string;

  @IsString()
  readonly description: string = '';

  @IsBoolean()
  readonly isFavorite: boolean;
}
