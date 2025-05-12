import { AUTH_RMQ_QUEUE } from '@app/common/CONSTANTS/app.constants';
import { setupApp } from '@app/common/config/setup/setup';
import { LogsffLogger } from '@app/common/logger/logsff-logger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LogsffLogger('Auth'),
  });
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow<string>('rmq.connections.uri')],
      queue: AUTH_RMQ_QUEUE,
    },
  });
  await setupApp(app);

  await app.startAllMicroservices();
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
