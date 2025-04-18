import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { isProduction } from '@app/common/config/environment.ts';

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
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
