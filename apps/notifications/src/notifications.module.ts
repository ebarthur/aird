import { CommonModule } from '@app/common/common.module';
import emailConfig from '@app/common/config/environment/email.config';
import notificationsConfig from '@app/common/config/environment/notifications.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ResendModule } from 'nestjs-resend';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [notificationsConfig, emailConfig],
      validationSchema: Joi.object({
        NOTIFICATIONS_PORT: Joi.number().port().default(3004),
        RESEND_API_KEY: Joi.string().required(),
        RESEND_FROM: Joi.string().email().required(),
      }),
    }),
    ResendModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        apiKey: configService.get('email.resend.apiKey'),
      }),
      inject: [ConfigService],
    }),
    CommonModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
