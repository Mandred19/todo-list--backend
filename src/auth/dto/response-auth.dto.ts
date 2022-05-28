import { ResponseUserDto } from '../../users/dto/response-user.dto';
import { Expose } from 'class-transformer';

export class ResponseAuthDto {
  @Expose()
  accessToken: string;

  // @Expose()
  // refreshToken: string;
  //
  // @Expose()
  // expiresIn: number;

  @Expose()
  payload: ResponseUserDto;
}
