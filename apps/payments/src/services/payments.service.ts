import {
  NOTIFICATIONS_SERVICE,
  NOTIFY_EMAIL,
} from '@app/common/CONSTANTS/app.constants';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentCreateChargeDto } from '../dto/payment-create-charge.dto';
import { IPaymentService } from '../interfaces/payment.interface';

@Injectable()
export class PaymentsService implements IPaymentService {
  private readonly stripeClient: Stripe;
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationService: ClientProxy,
  ) {
    this.stripeClient = new Stripe(
      configService.get<string>('payment.stripe.secret'),
      {
        apiVersion: '2025-03-31.basil',
      },
    );
  }

  async createCharge({
    amount,
    email,
  }: PaymentCreateChargeDto): Promise<Stripe.PaymentIntent> {
    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: amount * 100, // Amount in smallest unit
      currency: 'cad',
      payment_method: 'pm_card_visa', // Test card token provided by Stripe
      payment_method_types: ['card'],
    });
    this.notificationService.emit(NOTIFY_EMAIL, email); // fire and forget

    return paymentIntent;
  }
}
