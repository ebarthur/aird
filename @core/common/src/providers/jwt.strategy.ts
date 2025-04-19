import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthPayload } from 'apps/auth/src/modules/auth/interfaces/auth.interface';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { decodeBase64Key } from '../helpers/decode-keys';

@Injectable()
export class AuthJwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => request?.cookies?.auth || request?.auth,
      ]),
      ignoreExpiration: false,
      secretOrKey: decodeBase64Key(
        configService.get<string>('auth.accessToken.publicKey'),
      ),
    });
  }

  async validate(payload: IAuthPayload) {
    return payload;
  }
}
