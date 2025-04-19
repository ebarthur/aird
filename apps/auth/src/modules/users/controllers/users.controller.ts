import { Public } from '@app/common/decorators/public.decorator';
import { AllowedRoles } from '@app/common/decorators/role.decorator';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @AllowedRoles(['superuser'])
  @Get()
  async getUsers() {
    return this.userService.find();
  }
}
