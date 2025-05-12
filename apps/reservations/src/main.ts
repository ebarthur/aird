import { setupApp } from '@app/common/config/setup/setup';
import { LogsffLogger } from '@app/common/logger/logsff-logger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './modules/reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule, {
    logger: new LogsffLogger('Reservations'),
  });
  await setupApp(app);

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
