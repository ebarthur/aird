import { CommonModule } from '@app/common/common.module';
import authConfig from '@app/common/config/environment/auth.config';
import databaseConfig from '@app/common/config/environment/db.config';
import { DatabaseModule } from '@app/common/database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
      load: [databaseConfig, authConfig],
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().uri().required(),
        JWT_PUBLIC_KEY_BASE64: Joi.string().base64().required(),
        PORT: Joi.number().port().default(3000),
      }),
    }),
    CommonModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
