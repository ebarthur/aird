import { AbstractRepository } from '@app/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument } from '../entities/user.schema';

export class UsersRepository extends AbstractRepository<UsersDocument> {
  constructor(
    @InjectModel(UsersDocument.name) userModel: Model<UsersDocument>,
  ) {
    super(userModel, UsersRepository.name);
  }
}
