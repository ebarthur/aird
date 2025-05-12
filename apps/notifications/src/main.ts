import { NOTIFICATIONS_RMQ_QUEUE } from '@app/common/CONSTANTS/app.constants';
import { setupApp } from '@app/common/config/setup/setup';
import { LogsffLogger } from '@app/common/logger/logsff-logger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationsModule } from './notifications.module';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule, {
    logger: new LogsffLogger('Notifications'),
  });
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow<string>('rmq.connections.uri')],
      queue: NOTIFICATIONS_RMQ_QUEUE,
    },
  });

  await setupApp(app);
  await app.startAllMicroservices();
}
bootstrap();
