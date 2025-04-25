import { NOTIFY_EMAIL } from '@app/common/CONSTANTS/app.constants';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDto } from '../dtos/notify-email.dto';
import { NotificationsService } from '../services/notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern(NOTIFY_EMAIL)
  notify_email(@Payload() data: NotifyEmailDto) {
    this.notificationsService.notifyEmail(data);
  }
}
