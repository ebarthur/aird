import { TrimPipe } from '@app/common/pipes/trim-input.pipe';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

export async function setupApp(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use(cookieParser());
  app.use(helmet());
  app.useGlobalPipes(new TrimPipe());

  return app;
}
