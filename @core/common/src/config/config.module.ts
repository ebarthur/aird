import authConfig from '@app/common/config/environment/auth.config';
import databaseConfig from '@app/common/config/environment/db.config';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().uri().required(),
        JWT_PRIVATE_KEY_BASE64: Joi.string().base64().optional(),
        JWT_PUBLIC_KEY_BASE64: Joi.string().base64().required(),
      }),
    }),
  ],
})
export class ConfigModule {}
