import { CommonModule } from '@app/common/common.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UserDocument, UserSchema } from './entities/user.schema';
import { UsersRepository } from './repositories/users.repository';
import { UserService } from './services/users.service';

@Module({
  imports: [
    CommonModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  providers: [UserService, UsersRepository],
  controllers: [UsersController],
  exports: [UserService],
})
export class UsersModule {}
