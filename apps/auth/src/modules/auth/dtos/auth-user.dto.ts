import { OmitType } from '@nestjs/mapped-types';
import { UserDocument } from '../../users/entities/user.schema';

export class AuthUserDto extends OmitType(UserDocument, ['password']) {}
