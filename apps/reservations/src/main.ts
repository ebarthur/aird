import { isProduction } from '@app/common/config/environment';
import { TrimPipe } from '@app/common/pipes/trim-input.pipe';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule, {
    logger: isProduction
      ? ['error', 'warn']
      : ['log', 'warn', 'debug', 'error', 'verbose'],
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalPipes(new TrimPipe());
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
