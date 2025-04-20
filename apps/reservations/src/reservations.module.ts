import {
  AUTH_SERVICE,
  PAYMENTS_SERVICE,
} from '@app/common/CONSTANTS/app.constants';
import { CommonModule } from '@app/common/common.module';
import authConfig from '@app/common/config/environment/auth.config';
import databaseConfig from '@app/common/config/environment/db.config';
import paymentConfig from '@app/common/config/environment/payment.config';
import { DatabaseModule } from '@app/common/database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { ReservationsController } from './controllers/reservations.controller';
import {
  ReservationDocument,
  ReservationSchema,
} from './entities/reservation.schema';
import { ReservationsRepository } from './repositories/reservations.repository';
import { ReservationsService } from './services/reservations.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, paymentConfig],
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().uri().required(),
        JWT_PUBLIC_KEY_BASE64: Joi.string().base64().required(),
        PORT: Joi.number().port().default(3000),
        AUTH_HOST: Joi.string().hostname().required(),
        AUTH_PORT: Joi.number().port().required(),
        PAYMENT_TCP_PORT: Joi.number().port().default(3003),
        PAYMENT_TCP_HOST: Joi.string().hostname().required(),
      }),
    }),
    CommonModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('auth.tcp.host'),
            port: configService.get('auth.tcp.port'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('payment.connections.host'),
            port: configService.get('payment.connections.port'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
