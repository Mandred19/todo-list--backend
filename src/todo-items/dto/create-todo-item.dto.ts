import { Length, IsNotEmpty, IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateTodoItemDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 180)
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description?: string = '';

  @IsBoolean()
  readonly isComplete: boolean = false;

  @IsBoolean()
  readonly isFavorite: boolean = false;
}
