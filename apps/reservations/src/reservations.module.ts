import {
  AUTH_RMQ_QUEUE,
  AUTH_SERVICE,
  PAYMENTS_RMQ_QUEUE,
  PAYMENTS_SERVICE,
} from '@app/common/CONSTANTS/app.constants';
import { CommonModule } from '@app/common/common.module';
import authConfig from '@app/common/config/environment/auth.config';
import databaseConfig from '@app/common/config/environment/db.config';
import rmqConfig from '@app/common/config/environment/rmq.config';
import { DatabaseModule } from '@app/common/database/database.module';
import { JwtRPCAuthGuard } from '@app/common/guards/jwt-rpc.guard';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from 'apps/auth/src/modules/users/users.module';
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
      load: [databaseConfig, authConfig, rmqConfig],
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().uri().required(),
        MONGODB_URI: Joi.string().uri().required(),
        JWT_PUBLIC_KEY_BASE64: Joi.string().base64().required(),
        PORT: Joi.number().port().default(3000),
        LOGSFF_APP_ID: Joi.string().required(),
        LOGSFF_TOKEN: Joi.string().required(),
        LOGSFF_URL: Joi.string().uri().required(),
      }),
    }),
    UsersModule,
    CommonModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('rmq.connections.uri')],
            queue: AUTH_RMQ_QUEUE,
          },
        }),
        inject: [ConfigService],
      },
      {
        name: PAYMENTS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('rmq.connections.uri')],
            queue: PAYMENTS_RMQ_QUEUE,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [
    ReservationsService,
    ReservationsRepository,
    {
      provide: APP_GUARD,
      useClass: JwtRPCAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class ReservationsModule {}
