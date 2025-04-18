import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Dto } from '../dtos/dto';

@Schema()
export abstract class AbstractDocument<T = any> extends Dto<T> {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
