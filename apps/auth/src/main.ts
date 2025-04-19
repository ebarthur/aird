import { isProduction } from '@app/common/config/environment';
import { setupApp } from '@app/common/config/setup/setup';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: isProduction
      ? ['error', 'warn']
      : ['log', 'warn', 'debug', 'error', 'verbose'],
  });
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: configService.get<string>('auth.tcp.host'),
      port: configService.get<number>('auth.tcp.port'),
    },
  });
  await setupApp(app);
  app.startAllMicroservices();
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
