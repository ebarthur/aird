import { isProduction } from '@app/common/config/environment.ts';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
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

  await app.listen(process.env.port ?? 3001);
}
bootstrap();
