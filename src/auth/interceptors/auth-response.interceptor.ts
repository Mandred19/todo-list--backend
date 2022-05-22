import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { ResponseAuthDto } from '../dto/response-auth.dto';
import { ResponseUserDto } from '../../users/dto/response-user.dto';

@Injectable()
export class AuthResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = { excludeExtraneousValues: true, excludePrefixes: ['_', '__'] };

    return next.handle().pipe(
      map((value: ResponseAuthDto): ResponseAuthDto => {
        const user = plainToInstance(ResponseUserDto, value.user, options);

        return {
          token: value.token,
          user,
        };
      }),
    );
  }
}
