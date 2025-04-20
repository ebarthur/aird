import Stripe from 'stripe';
import { CreateChargeDto } from '../../../../@core/common/src/dtos/create-charge.dto';

export interface IPaymentService {
  createCharge(data: CreateChargeDto): Promise<Stripe.PaymentIntent>;
}
