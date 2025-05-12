import {
  NOTIFICATIONS_RMQ_QUEUE,
  NOTIFICATIONS_SERVICE,
} from '@app/common/CONSTANTS/app.constants';
import { CommonModule } from '@app/common/common.module';
import paymentConfig from '@app/common/config/environment/payment.config';
import rmqConfig from '@app/common/config/environment/rmq.config';
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
      load: [paymentConfig, rmqConfig],
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().uri().required(),
        STRIPE_SECRET_KEY: Joi.string().required(),
        LOGSFF_APP_ID: Joi.string().required(),
        LOGSFF_TOKEN: Joi.string().required(),
        LOGSFF_URL: Joi.string().uri().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('rmq.connections.uri')],
            queue: NOTIFICATIONS_RMQ_QUEUE,
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
