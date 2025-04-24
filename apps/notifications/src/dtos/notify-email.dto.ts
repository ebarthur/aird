import { PickType } from '@nestjs/mapped-types';
import { PaymentCreateChargeDto } from 'apps/payments/src/dto/payment-create-charge.dto';

export class NotifyEmailDto extends PickType(PaymentCreateChargeDto, [
  'email',
]) {}
