import {
  NOTIFICATIONS_SERVICE_NAME,
  NotificationsServiceClient,
} from '@app/common/types/notifications';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentCreateChargeDto } from '../dto/payment-create-charge.dto';
import { IPaymentService } from '../interfaces/payment.interface';

@Injectable()
export class PaymentsService implements IPaymentService {
  private readonly stripeClient: Stripe;
  private notificationService: NotificationsServiceClient;
  private logger = new Logger(PaymentsService.name, { timestamp: true });

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

  async createCharge({ amount, email }: PaymentCreateChargeDto) {
    try {
      const paymentIntent = await this.stripeClient.paymentIntents.create({
        amount: amount * 100,
        currency: 'cad',
        payment_method: 'pm_card_visa',
        payment_method_types: ['card'],
        metadata: { email },
      });

      if (!this.notificationService) {
        try {
          this.notificationService =
            this.client.getService<NotificationsServiceClient>(
              NOTIFICATIONS_SERVICE_NAME,
            );
        } catch (error) {
          this.logger.warn('Failed to initialize notification service', error);
        }
      }

      if (this.notificationService) {
        this.notificationService.notifyEmail({ email }).subscribe({
          error: (error) => {
            this.logger.debug('Failed to notify user', error);
          },
        });
      }

      return { id: paymentIntent.id };
    } catch (error) {
      this.logger.error(
        'Failed to create charge',
        { error, amount, email },
        error,
      );

      throw error;
    }
  }
}
