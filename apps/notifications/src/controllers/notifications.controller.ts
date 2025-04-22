import { NOTIFY_EMAIL } from '@app/common/CONSTANTS/app.constants';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from '../services/notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern(NOTIFY_EMAIL)
  async notify_email(@Payload() _data: any) {}
}
