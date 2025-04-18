import { CommonModule } from '@app/common/common.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '../modules/auth/auth.module';
import { UsersModule } from '../modules/users/users.module';

@Module({
  imports: [CommonModule, AuthModule, UsersModule],
  providers: [],
  exports: [],
})
export class AppModule {}
