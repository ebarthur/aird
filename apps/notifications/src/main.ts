import { join } from 'node:path';
import { setupApp } from '@app/common/config/setup/setup';
import { LogsffLogger } from '@app/common/logger/logsff-logger';
import { NOTIFICATIONS_PACKAGE_NAME } from '@app/common/types/notifications';
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
    transport: Transport.GRPC,
    options: {
      package: NOTIFICATIONS_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/notifications.proto'),
      url: configService.getOrThrow<string>('notifications.grpc.url'),
    },
  });

  await setupApp(app);
  await app.startAllMicroservices();
}
bootstrap();
