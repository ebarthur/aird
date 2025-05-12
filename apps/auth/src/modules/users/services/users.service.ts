import { HashService } from '@app/common/services/hash.service';
import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { User } from '../entities/user.entity';
import { IUserService } from '../interfaces/user-service.interface';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UserService implements IUserService {
  private logger = new Logger(UserService.name, { timestamp: true });
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const { email, password } = createUserDto;
    const userExists = await this.usersRepository.findOne({
      email: createUserDto.email,
    });

    if (userExists)
      throw new UnprocessableEntityException('user.userExistsByEmail');

    const hashedPassword = await this.hashService.createHash(password);
    const user = new User({
      email,
      password: hashedPassword,
      role: 'common',
    });
    await this.usersRepository.create(user);
  }

  async find(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password: loginPassword } = loginUserDto;
    const user = await this.usersRepository.findOne({
      email,
    });

    if (!user) throw new NotFoundException('user.userNotFound');

    const isValidPassword = await this.hashService.match(
      loginPassword,
      user.password,
    );

    if (!isValidPassword)
      throw new UnauthorizedException('user.invalidPassword');

    this.logger.log(`User ${user.id} has been validated.`);
    return user;
  }
}
