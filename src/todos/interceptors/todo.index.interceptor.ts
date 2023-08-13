import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { omit } from 'lodash';
import { Todo } from '../entities/todo.entity';

export type Response = Partial<Todo>[];

@Injectable()
export class TodoIndexTransformInterceptor<T>
  implements NestInterceptor<T, Response>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {
    return next
      .handle()
      .pipe(map((data: Todo[]) => data.map((todo) => omit(todo, ['body']))));
  }
}
