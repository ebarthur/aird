import { AuthUser } from '@app/common/decorators/auth.decorator';
import { Public } from '@app/common/decorators/public.decorator';
import {
  AuthServiceController,
  AuthServiceControllerMethods,
} from '@app/common/types/auth';
import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Response } from 'express';
import { AuthUserDto } from '../dtos/auth-user.dto';
import { JwtGuard } from '../guards/jwt.guard';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @AuthUser() user: AuthUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(user, response);
  }

  @UseGuards(JwtGuard)
  async authenticate(@Payload() data: any) {
    return {
      ...data.user,
    };
  }
}
