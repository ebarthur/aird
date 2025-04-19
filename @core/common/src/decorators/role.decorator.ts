import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { ROLE } from 'apps/auth/src/modules/auth/interfaces/auth.interface';

export const AllowedRoles = (roles: ROLE[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);
