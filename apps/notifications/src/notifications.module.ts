import { CommonModule } from '@app/common/common.module';
import notificationsConfig from '@app/common/config/environment/notifications.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { NotificationsController } from './controllers/notifications.controller';
import { NotificationsService } from './services/notifications.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [notificationsConfig],
      validationSchema: Joi.object({
        NOTIFICATIONS_PORT: Joi.number().port().default(3004),
      }),
    }),
    CommonModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
