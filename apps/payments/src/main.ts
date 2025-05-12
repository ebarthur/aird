import { join } from 'node:path';
import { setupApp } from '@app/common/config/setup/setup';
import { LogsffLogger } from '@app/common/logger/logsff-logger';
import { PAYMENTS_PACKAGE_NAME } from '@app/common/types/payments';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PaymentsModule } from './modules/payments.module';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule, {
    logger: new LogsffLogger('Payments'),
  });
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: PAYMENTS_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/payments.proto'),
      url: configService.getOrThrow<string>('payment.grpc.url'),
    },
  });
  await setupApp(app);
  await app.startAllMicroservices();
}
bootstrap();
