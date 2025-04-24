import { CreateChargeDto } from '@app/common/dtos/create-charge.dto';
import { IsEmail } from 'class-validator';

export class PaymentCreateChargeDto extends CreateChargeDto {
  @IsEmail()
  email: string;
}
