import {
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
} from '@app/common/types/notifications';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentCreateChargeDto } from '../dto/payment-create-charge.dto';
import { IPaymentService } from '../interfaces/payment.interface';

@Injectable()
export class PaymentsService implements IPaymentService {
  private readonly stripeClient: Stripe;
  private notificationService: NotificationsServiceClient;

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE_NAME)
    private readonly client: ClientGrpc,
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

    if (!this.notificationService) {
      this.notificationService =
        this.client.getService<NotificationsServiceClient>(
          NOTIFICATIONS_SERVICE_NAME,
        );
    }

    this.notificationService.notifyEmail({ email }).subscribe(() => {});

    return paymentIntent;
  }
}
