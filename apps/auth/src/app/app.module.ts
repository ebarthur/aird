import { CommonModule } from '@app/common/common.module';
import authConfig from '@app/common/config/environment/auth.config';
import databaseConfig from '@app/common/config/environment/db.config';
import { AuthJwtAccessGuard } from '@app/common/guards/jwt.guard';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { AuthJwtAccessStrategy } from '@app/common/providers/jwt.strategy';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().uri().required(),
        JWT_PRIVATE_KEY_BASE64: Joi.string().base64().required(),
        JWT_PUBLIC_KEY_BASE64: Joi.string().base64().required(),
        PORT: Joi.number().port().default(3001),
        AUTH_PORT: Joi.number().port().required(),
      }),
    }),
    CommonModule,
    AuthModule,
  ],
  providers: [
    AuthJwtAccessStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthJwtAccessGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
