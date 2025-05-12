import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/common/types/payments';
import { Controller } from '@nestjs/common';
import { PaymentCreateChargeDto } from '../dto/payment-create-charge.dto';
import { PaymentsService } from '../services/payments.service';

@Controller()
@PaymentsServiceControllerMethods()
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  async createCharge(data: PaymentCreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
