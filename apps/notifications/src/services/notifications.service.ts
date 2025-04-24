import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResendService } from 'nestjs-resend';

@Injectable()
export class NotificationsService {
  private logger = new Logger(NotificationsService.name, { timestamp: true });

  constructor(
    private readonly configService: ConfigService,
    private readonly resendService: ResendService,
  ) {}
  notifyEmail(email: string) {
    this.resendService.send({
      from: this.configService.get('email.resend.from'),
      to: email,
      subject: 'Aird Notifications',
      text: 'This is a test notification',
    });
  }
}
