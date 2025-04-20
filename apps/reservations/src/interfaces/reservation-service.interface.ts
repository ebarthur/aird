import { ObjectId } from 'mongoose';
import { Observable } from 'rxjs';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationDocument } from '../entities/reservation.schema';

export interface IReservationService {
  create(
    createReservationDto: CreateReservationDto,
    userId: string,
  ): Promise<Observable<Promise<ReservationDocument>>>;
  findAll(): Promise<ReservationDocument[]>;
  findOne(_id: ObjectId): Promise<ReservationDocument>;
  update(
    _id: ObjectId,
    data: UpdateReservationDto,
  ): Promise<ReservationDocument>;
  remove(_id: ObjectId): Promise<ReservationDocument>;
}
