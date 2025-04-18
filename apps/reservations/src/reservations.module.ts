import { CommonModule } from '@app/common/common.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { Module } from '@nestjs/common';
import {
  ReservationDocument,
  ReservationSchema,
} from './entities/reservation.schema';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { ReservationsService } from './reservations.service';

@Module({
  imports: [
    CommonModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
