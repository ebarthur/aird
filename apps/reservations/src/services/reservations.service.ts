import {
  CREATE_CHARGE,
  PAYMENTS_SERVICE,
} from '@app/common/CONSTANTS/app.constants';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UsersRepository } from 'apps/auth/src/modules/users/repositories/users.repository';
import { ObjectId } from 'mongoose';
import { Observable, catchError, map } from 'rxjs';
import Stripe from 'stripe';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationDocument } from '../entities/reservation.schema';
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
  ): Promise<Observable<Promise<ReservationDocument>>> {
    const { email } = await this.userRepository.findOneOrFail({ _id: userId });

    return this.paymentsService
      .send(CREATE_CHARGE, { ...createReservationDto.charge, email })
      .pipe(
        map((res: Stripe.PaymentIntent) => {
          const { id: invoiceId } = res;
          return this.reservationRepository.create({
            ...createReservationDto,
            userId,
            timestamp: new Date(),
            invoiceId,
          });
        }),
        catchError((_e) => {
          throw new BadRequestException('payment.errorProcessingPayment');
        }),
      );
  }

  async findAll() {
    return this.reservationRepository.find({});
  }

  async findOne(_id: ObjectId) {
    return this.reservationRepository.findOneOrFail({ _id });
  }

  async update(_id: ObjectId, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: ObjectId) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
