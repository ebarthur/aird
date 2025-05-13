import { CreateChargeDto } from '@app/common/dtos/create-charge.dto';
import { CreateChargeMessage } from '@app/common/types/payments';
import { IsEmail } from 'class-validator';

export class PaymentCreateChargeDto
  extends CreateChargeDto
  implements CreateChargeMessage
{
  @IsEmail()
  email: string;
}
