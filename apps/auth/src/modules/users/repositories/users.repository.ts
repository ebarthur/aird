import { AbstractRepository } from '@app/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../entities/user.schema';

export class UsersRepository extends AbstractRepository<UserDocument> {
  constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
    super(userModel, UsersRepository.name);
  }
}
