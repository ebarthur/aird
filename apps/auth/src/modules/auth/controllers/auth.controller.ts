import { AUTH_MESSAGE_PATTERN } from '@app/common/CONSTANTS/app.constants';
import { AuthUser } from '@app/common/decorators/auth.decorator';
import { Public } from '@app/common/decorators/public.decorator';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthUserDto } from '../dtos/auth-user.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @AuthUser() user: AuthUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
  }

  @UseGuards(JwtGuard)
  @MessagePattern(AUTH_MESSAGE_PATTERN)
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
