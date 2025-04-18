import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @Type(() => Date)
  startDate: Date;

  @IsNotEmpty()
  @Type(() => Date)
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  placeId: string;

  @IsNotEmpty()
  @IsString()
  invoiceId: string;
}
