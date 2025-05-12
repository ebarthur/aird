import {
  CREATE_CHARGE,
  PAYMENTS_SERVICE,
} from '@app/common/CONSTANTS/app.constants';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UsersRepository } from 'apps/auth/src/modules/users/repositories/users.repository';
import { Observable, catchError, map } from 'rxjs';
import Stripe from 'stripe';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { Reservation } from '../entities/reservation.entity';
import { IReservationService } from '../interfaces/reservation-service.interface';
import { ReservationsRepository } from '../repositories/reservations.repository';

@Injectable()
export class ReservationsService implements IReservationService {
  constructor(
    private readonly reservationRepository: ReservationsRepository,
    private readonly userRepository: UsersRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}
  async create(
    createReservationDto: CreateReservationDto,
    userId: string,
  ): Promise<Observable<Promise<Reservation>>> {
    const { email } = await this.userRepository.findOneOrFail({ id: userId });

    return this.paymentsService
      .send(CREATE_CHARGE, { ...createReservationDto.charge, email })
      .pipe(
        map((res: Stripe.PaymentIntent) => {
          const { id: invoiceId } = res;
          const reservation = new Reservation({
            startDate: createReservationDto.startDate,
            endDate: createReservationDto.endDate,
            userId,
            timestamp: new Date(),
            invoiceId,
          });

          return this.reservationRepository.create(reservation);
        }),
        catchError((_e) => {
          console.log(_e);
          throw new BadRequestException('payment.errorProcessingPayment');
        }),
      );
  }

  async findAll() {
    return this.reservationRepository.find({});
  }

  async findOne(id: string) {
    return this.reservationRepository.findOneOrFail({ id });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { id },
      updateReservationDto,
    );
  }

  async remove(id: string) {
    return this.reservationRepository.findOneAndDelete({ id });
  }
}
