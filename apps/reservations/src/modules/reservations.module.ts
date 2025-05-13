import { join } from 'node:path';
import { CommonModule } from '@app/common/common.module';
import authConfig from '@app/common/config/environment/auth.config';
import databaseConfig from '@app/common/config/environment/db.config';
import paymentConfig from '@app/common/config/environment/payment.config';
import { DatabaseModule } from '@app/common/database/database.module';
import { JwtRPCAuthGuard } from '@app/common/guards/jwt-rpc.guard';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { AUTH_PACKAGE_NAME, AUTH_SERVICE_NAME } from '@app/common/types/auth';
import {
  PAYMENTS_PACKAGE_NAME,
  PAYMENTS_SERVICE_NAME,
} from '@app/common/types/payments';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from 'apps/auth/src/modules/users/users.module';
import * as Joi from 'joi';
import { ReservationsController } from '../controllers/reservations.controller';
import {
  ReservationDocument,
  ReservationSchema,
} from '../entities/reservation.schema';
import { ReservationsRepository } from '../repositories/reservations.repository';
import { ReservationsService } from '../services/reservations.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, paymentConfig],
      validationSchema: Joi.object({
        AUTH_GRPC_URL: Joi.string().required(),
        PAYMENT_GRPC_URL: Joi.string().required(),
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
        name: AUTH_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: AUTH_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../proto/auth.proto'),
            url: configService.getOrThrow<string>('auth.grpc.url'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: PAYMENTS_SERVICE_NAME,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: PAYMENTS_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../proto/payments.proto'),
            url: configService.getOrThrow<string>('payment.grpc.url'),
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
