import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservation> {
  constructor(
    @InjectRepository(Reservation)
    reservationRepository: Repository<Reservation>,
    entityManager: EntityManager,
  ) {
    super(reservationRepository, entityManager);
  }
}
