import { isProduction } from '@app/common/config/environment';
import { setupApp } from '@app/common/config/setup/setup';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: isProduction
      ? ['error', 'warn']
      : ['log', 'warn', 'debug', 'error', 'verbose'],
  });
  await setupApp(app);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
