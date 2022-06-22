import { Length, IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class CreateTodoItemDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  readonly title: string;

  @IsString()
  @Length(0, 2500)
  readonly description: string = '';

  @IsBoolean()
  readonly isFavorite: boolean;

  @IsBoolean()
  readonly isComplete: boolean = false;
}
