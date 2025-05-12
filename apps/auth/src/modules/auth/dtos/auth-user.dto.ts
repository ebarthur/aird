import { OmitType } from '@nestjs/mapped-types';
import { User } from '../../users/entities/user.entity';

export class AuthUserDto extends OmitType(User, ['password']) {}
