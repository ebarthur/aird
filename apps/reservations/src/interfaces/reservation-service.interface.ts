import { Observable } from 'rxjs';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { Reservation } from '../entities/reservation.entity';

export interface IReservationService {
  create(
    createReservationDto: CreateReservationDto,
    userId: string,
  ): Promise<Observable<Promise<Reservation>>>;
  findAll(): Promise<Reservation[]>;
  findOne(id: string): Promise<Reservation>;
  update(id: string, data: UpdateReservationDto): Promise<Reservation>;
  remove(id: string): Promise<void>;
}
