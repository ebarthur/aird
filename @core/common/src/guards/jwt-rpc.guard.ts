import {
  AUTH_MESSAGE_PATTERN,
  AUTH_SERVICE,
} from '@app/common/CONSTANTS/app.constants';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable()
export class JwtRPCAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookies?.auth ||
      context.switchToHttp().getRequest().headers?.auth;

    if (!jwt) throw new UnauthorizedException();

    return this.authClient
      .send(AUTH_MESSAGE_PATTERN, {
        auth: jwt,
      })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
