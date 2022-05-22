import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDto {
  @Expose()
  id: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly email: string;

  @Exclude()
  readonly password: string;

  @Expose()
  readonly createdAt: Date;

  @Expose()
  readonly updatedAt: Date;
}
