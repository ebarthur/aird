import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationsRepository) {}

  create(createReservationDto: CreateReservationDto) {
    return this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123',
    });
  }

  findAll() {
    return this.reservationRepository.find({});
  }

  findOne(_id: ObjectId) {
    return this.reservationRepository.findOne({ _id });
  }

  update(_id: ObjectId, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  remove(_id: ObjectId) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
