import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsService } from './reservations.service';
import { ValidateObjectIdPipe } from '@app/common/pipes/validate-object-id.pipe';
import { ObjectId } from 'mongoose';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
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
