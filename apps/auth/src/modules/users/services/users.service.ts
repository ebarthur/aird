import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { IUserService } from '../interfaces/user-service.interface';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UserService implements IUserService {
  private logger = new Logger(UserService.name, { timestamp: true });
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.create(createUserDto);

    // []: Continue
  }
}
