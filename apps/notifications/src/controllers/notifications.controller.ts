import {
  NotificationsServiceController,
  NotificationsServiceControllerMethods,
} from '@app/common/types/notifications';
import { Controller } from '@nestjs/common';
import { NotifyEmailDto } from '../dtos/notify-email.dto';
import { NotificationsService } from '../services/notifications.service';

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
  constructor(private readonly notificationsService: NotificationsService) {}

  async notifyEmail(data: NotifyEmailDto) {
    this.notificationsService.notifyEmail(data);
  }
}
