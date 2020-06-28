import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import ErrorDomain from '../../../../domain/shared/ErrorDomain'

@Injectable()
export class Interceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError(err => {
                if (err instanceof ErrorDomain) {
                    return throwError(new BadRequestException(err.message, err.name))
                }
                return throwError(err)
            }),
        )
    }
}
