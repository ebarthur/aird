import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateChargeDto } from '../../../../@core/common/src/dtos/create-charge.dto';
import { IPaymentService } from '../interfaces/payment.interface';

@Injectable()
export class PaymentsService implements IPaymentService {
  private readonly stripeClient: Stripe;
  constructor(private readonly configService: ConfigService) {
    this.stripeClient = new Stripe(
      configService.get<string>('payment.stripe.secret'),
      {
        apiVersion: '2025-03-31.basil',
      },
    );
  }

  async createCharge({
    amount,
  }: CreateChargeDto): Promise<Stripe.PaymentIntent> {
    return await this.stripeClient.paymentIntents.create({
      amount: amount * 100, // Amount in smallest unit
      currency: 'cad',
      payment_method: 'pm_card_visa', // Test card token provided by Stripe
      payment_method_types: ['card'],
    });
  }
}
