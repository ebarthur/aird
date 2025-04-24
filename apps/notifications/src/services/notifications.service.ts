import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResendService } from 'nestjs-resend';

@Injectable()
export class NotificationsService {
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
