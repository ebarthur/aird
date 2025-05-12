import { Logger, NotFoundException } from '@nestjs/common';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AbstractEntity } from './abstract.entity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
  protected readonly logger: Logger;

  constructor(
    protected readonly entityRepository: Repository<T>,
    private readonly entityManager: EntityManager,
    context?: string,
  ) {
    this.logger = new Logger(context || this.constructor.name, {
      timestamp: true,
    });
  }

  async create(entity: T): Promise<T> {
    return this.entityManager.save(entity);
  }

  async findOne(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.entityRepository.findOne({ where });

    if (!entity) {
      this.logger.warn('Entity not found with filterQuery', where);
    }
    return entity;
  }

  async findOneOrFail(where: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.entityRepository.findOne({ where });

    if (!entity) {
      this.logger.warn('Entity was not found with filterQuery ', where);
      throw new NotFoundException('Entity was not found');
    }

    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<T>,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<T> {
    const entity = await this.entityRepository.update(where, partialEntity);

    if (!entity.affected) {
      this.logger.warn('Entity not found with filterQuery: ', where);
      throw new NotFoundException('Entity was not found');
    }

    return this.findOne(where);
  }

  async find(where: FindOptionsWhere<T>): Promise<T[]> {
    return this.entityRepository.findBy(where);
  }

  async findOneAndDelete(where: FindOptionsWhere<T>): Promise<void> {
    await this.entityRepository.delete(where);
  }
}
