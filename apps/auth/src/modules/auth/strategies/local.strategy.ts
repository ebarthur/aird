import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../../users/services/users.service';
import { AuthUserDto } from '../dtos/auth-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
    });
  }
  async validate(email: string, password: string): Promise<AuthUserDto> {
    try {
      const user = await this.userService.validateUser({ email, password });
      return {
        _id: user._id,
        email: user.email,
        role: user.role,
      };
    } catch (e) {
      if (e instanceof NotFoundException || UnauthorizedException) throw e;

      throw new InternalServerErrorException('user.serverError');
    }
  }
}
