import { CurrentUser, ReqUser } from '@app/common/decorators/auth.decorator';
import { ValidateObjectIdPipe } from '@app/common/pipes/validate-object-id.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { ReservationsService } from '../services/reservations.service';
import { JwtRPCAuthGuard } from '@app/common/guards/jwt-rpc.guard';

@UseGuards(JwtRPCAuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(
    @Body() createReservationDto: CreateReservationDto,
    @CurrentUser() user: ReqUser,
  ) {
    return this.reservationsService.create(createReservationDto, user.id);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateObjectIdPipe) id: ObjectId) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateObjectIdPipe) id: ObjectId,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateObjectIdPipe) id: ObjectId) {
    return this.reservationsService.remove(id);
  }
}
