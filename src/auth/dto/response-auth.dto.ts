import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { Expose } from 'class-transformer';

export class ResponseAuthDto {
  @Expose()
  token: string;

  @Expose()
  user: ResponseUserDto;
}
