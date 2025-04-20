import { CommonModule } from '@app/common/common.module';
import paymentConfig from '@app/common/config/environment/payment.config';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { PaymentsController } from '../controllers/payments.controller';
import { PaymentsService } from '../services/payments.service';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [paymentConfig],
      validationSchema: Joi.object({
        PAYMENT_TCP_PORT: Joi.number().port().default(3003),
        STRIPE_SECRET_KEY: Joi.string().required(),
      }),
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
