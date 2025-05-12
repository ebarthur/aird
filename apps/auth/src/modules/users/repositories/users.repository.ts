import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
    entityManager: EntityManager,
  ) {
    super(userRepository, entityManager);
  }
}
