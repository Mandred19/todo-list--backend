import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../entities/user.entity';
import { ResponseUserDto } from '../dto/response-user.dto';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = { excludeExtraneousValues: true, excludePrefixes: ['_', '__'] };

    return next
      .handle()
      .pipe(map((user: UserEntity): ResponseUserDto => plainToInstance(ResponseUserDto, user, options)));
  }
}
