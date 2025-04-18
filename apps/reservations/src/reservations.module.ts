import { CommonModule } from '@app/common/common.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { Module } from '@nestjs/common';
import { ReservationsController } from './controllers/reservations.controller';
import {
  ReservationDocument,
  ReservationSchema,
} from './entities/reservation.schema';
import { ReservationsRepository } from './repositories/reservations.repository';
import { ReservationsService } from './services/reservations.service';

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
