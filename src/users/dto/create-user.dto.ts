import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 30)
  readonly name: string = 'User';

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 36)
  readonly password: string;

  @IsDate()
  readonly createdDate: Date = new Date();

  @IsDate()
  readonly updatedDate: Date = new Date();
}
