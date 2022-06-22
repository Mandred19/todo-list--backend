import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 25)
  readonly name: string = 'User';

  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 36)
  readonly password: string;

  @IsString()
  readonly avatar: string = '';
}
