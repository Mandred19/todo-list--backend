import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
import { User } from '../entities/user.entity';
import { ResponseUserDto } from '../dto/response-user.dto';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const options = { excludeExtraneousValues: true, excludePrefixes: ['_', '__'] };

    return next.handle().pipe(
      map((user: User): ResponseUserDto => plainToInstance(ResponseUserDto, user, options)),
    );
  }
}
