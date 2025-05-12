import {
  PAYMENTS_SERVICE_NAME,
  PaymentsServiceClient,
} from '@app/common/types/payments';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
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
export class ReservationsService implements IReservationService, OnModuleInit {
  private paymentService: PaymentsServiceClient;
  constructor(
    private readonly reservationRepository: ReservationsRepository,
    private readonly userRepository: UsersRepository,
    @Inject(PAYMENTS_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.paymentService = this.client.getService<PaymentsServiceClient>(
      PAYMENTS_SERVICE_NAME,
    );
  }
  async create(
    createReservationDto: CreateReservationDto,
    userId: string,
  ): Promise<Observable<Promise<ReservationDocument>>> {
    let email: string;
    try {
      const user = await this.userRepository.findOneOrFail({
        _id: userId,
      });
      email = user.email;
    } catch (_) {
      throw new UnauthorizedException();
    }

    return this.paymentService
      .createCharge({ ...createReservationDto.charge, email })
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
          console.log('sTRIPE ERROR: ', _e);
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
