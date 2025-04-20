import { Response } from 'express';
import { AuthUserDto } from '../dtos/auth-user.dto';

export interface IAuthService {
  login(user: AuthUserDto, response: Response): Promise<void>;
}
