import { IAuthPayload, ROLE } from '@app/common/interfaces/auth.interface';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthUserDto } from '../dtos/auth-user.dto';
import { IAuthService } from '../interfaces/auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: AuthUserDto, response: Response) {
    const tokenPayload: IAuthPayload = {
      id: user.id,
      role: user.role as ROLE,
    };

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('auth', token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    return { token };
  }
}
