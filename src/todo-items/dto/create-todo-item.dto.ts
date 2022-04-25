import {
  Length,
  IsDate,
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateTodoItemDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 180)
  readonly title: string;

  @IsOptional()
  @IsString({
    message: 'Description must be a string',
  })
  readonly description?: string = '';

  @IsDate()
  readonly createdDate: Date = new Date();

  @IsDate()
  readonly updatedDate: Date = new Date();

  @IsBoolean()
  readonly isComplete: boolean = false;

  @IsBoolean()
  readonly isFavorite: boolean = false;
}
