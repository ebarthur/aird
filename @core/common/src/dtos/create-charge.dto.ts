import { Dto } from '@app/common/dtos/dto';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CreateChargeMessage } from '../types/payments';
import { CardDto } from './card.dto';

export class CreateChargeDto
  extends Dto<CreateChargeDto>
  implements Omit<CreateChargeMessage, 'email'>
{
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  amount: number;
}
