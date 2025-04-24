import { NOTIFY_EMAIL } from '@app/common/CONSTANTS/app.constants';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from 'apps/payments/src/dto/payment-create-charge.dto';
import { NotificationsService } from '../services/notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern(NOTIFY_EMAIL)
  notify_email(@Payload() email: PaymentCreateChargeDto['email']) {
    this.notificationsService.notifyEmail(email);
  }
}
