import { join } from 'node:path';
import { setupApp } from '@app/common/config/setup/setup';
import { LogsffLogger } from '@app/common/logger/logsff-logger';
import { AUTH_PACKAGE_NAME } from '@app/common/types/auth';
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
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/auth.proto'),
      url: configService.getOrThrow<string>('auth.grpc.url'),
    },
  });
  await setupApp(app);

  await app.startAllMicroservices();
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
