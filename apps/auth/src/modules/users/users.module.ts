import { CommonModule } from '@app/common/common.module';
import { DatabaseModule } from '@app/common/database/database.module';
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';
import { UserService } from './services/users.service';

@Module({
  imports: [CommonModule, DatabaseModule, DatabaseModule.forFeature([User])],
  providers: [UserService, UsersRepository],
  controllers: [UsersController],
  exports: [UserService, UsersRepository],
})
export class UsersModule {}
