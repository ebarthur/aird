import { NOTIFICATIONS_SERVICE } from '@app/common/CONSTANTS/app.constants';
import { CommonModule } from '@app/common/common.module';
import notificationsConfig from '@app/common/config/environment/notifications.config';
import paymentConfig from '@app/common/config/environment/payment.config';
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
        PAYMENT_TCP_PORT: Joi.number().port().default(3003),
        STRIPE_SECRET_KEY: Joi.string().required(),
        NOTIFICATIONS_HOST: Joi.string().required(),
        NOTIFICATIONS_PORT: Joi.number().port().default(3004),
        LOGSFF_APP_ID: Joi.string().required(),
        LOGSFF_TOKEN: Joi.string().required(),
        LOGSFF_URL: Joi.string().uri().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('notifications.connections.host'),
            port: configService.get('notifications.connections.port'),
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
