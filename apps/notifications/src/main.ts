import { setupApp } from '@app/common/config/setup/setup';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NotificationsModule } from './notifications.module';
import { LogsffLogger } from '@app/common/logger/logsff-logger';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule, {
    logger: new LogsffLogger('Notifications'),
  });
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('notifications.connections.port'),
    },
  });

  await setupApp(app);
  await app.startAllMicroservices();
}
bootstrap();
