import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthUserDto } from 'apps/auth/src/modules/auth/dtos/auth-user.dto';
import { ROLE } from 'apps/auth/src/modules/auth/interfaces/auth.interface';

export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user as AuthUserDto; // use for only login
  },
);

export type ReqUser = {
  id: string;
  role: ROLE;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user as ReqUser;
  },
);
