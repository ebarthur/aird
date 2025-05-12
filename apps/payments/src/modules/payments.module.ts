import { join } from 'path';
import { CommonModule } from '@app/common/common.module';
import notificationsConfig from '@app/common/config/environment/notifications.config';
import paymentConfig from '@app/common/config/environment/payment.config';
import {
  NOTIFICATIONS_PACKAGE_NAME,
  NOTIFICATIONS_SERVICE_NAME,
} from '@app/common/types/notifications';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { PaymentsController } from '../controllers/payments.controller';
import { PaymentsService } from '../services/payments.service';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [paymentConfig, notificationsConfig],
      validationSchema: Joi.object({
        NOTIFICATION_GRPC_URL: Joi.string().uri().required(),
        PAYMENT_GRPC_URL: Joi.string().uri().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
        LOGSFF_APP_ID: Joi.string().required(),
        LOGSFF_TOKEN: Joi.string().required(),
        LOGSFF_URL: Joi.string().uri().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: NOTIFICATIONS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../proto/notifications.proto'),
            url: configService.getOrThrow<string>('notifications.grpc.url'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
