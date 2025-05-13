import { CreateChargeDto } from '@app/common/dtos/create-charge.dto';

export interface IPaymentService {
  createCharge(data: CreateChargeDto): Promise<{ id: string }>;
}
