import { ROLE } from '@app/common/interfaces/auth.interface';
import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const AllowedRoles = (roles: ROLE[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);
