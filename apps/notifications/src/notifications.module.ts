import { CommonModule } from '@app/common/common.module';
import emailConfig from '@app/common/config/environment/email.config';
import rmqConfig from '@app/common/config/environment/rmq.config';
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
      load: [emailConfig, rmqConfig],
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().uri().required(),
        RESEND_API_KEY: Joi.string().required(),
        RESEND_FROM: Joi.string().email().required(),
        LOGSFF_APP_ID: Joi.string().required(),
        LOGSFF_TOKEN: Joi.string().required(),
        LOGSFF_URL: Joi.string().uri().required(),
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
