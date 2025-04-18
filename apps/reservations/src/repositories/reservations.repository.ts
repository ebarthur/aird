import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReservationDocument } from '../entities/reservation.schema';

@Injectable()
export class ReservationsRepository extends AbstractRepository<ReservationDocument> {
  constructor(
    @InjectModel(ReservationDocument.name)
    reservationModel: Model<ReservationDocument>,
  ) {
    super(reservationModel, ReservationsRepository.name);
  }
}
