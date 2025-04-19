import { AuthUserDto } from '../../auth/dtos/auth-user.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDocument } from '../entities/user.schema';

export interface IUserService {
  validateUser(data: CreateUserDto): Promise<UserDocument>;
  create(data: CreateUserDto): Promise<void>;
  find(): Promise<AuthUserDto[]>;
}
