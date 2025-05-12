import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

export interface IUserService {
  validateUser(data: CreateUserDto): Promise<User>;
  create(data: CreateUserDto): Promise<void>;
  find(): Promise<User[]>;
}
