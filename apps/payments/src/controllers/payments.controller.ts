import { CREATE_CHARGE } from '@app/common/CONSTANTS/app.constants';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from '../dto/payment-create-charge.dto';
import { PaymentsService } from '../services/payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern(CREATE_CHARGE)
  async createCharge(@Payload() data: PaymentCreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
