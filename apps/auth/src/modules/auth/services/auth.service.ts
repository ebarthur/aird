import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AuthUserDto } from '../dtos/auth-user.dto';
import { IAuthPayload } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: AuthUserDto, response: Response) {
    const tokenPayload: IAuthPayload = {
      id: user._id.toHexString(),
      role: user.role,
    };

    const token = this.jwtService.sign(tokenPayload);
    response.cookie('auth', token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });
  }
}
