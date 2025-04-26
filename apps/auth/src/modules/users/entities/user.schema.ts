import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ROLE,
  USER_ROLE,
} from '../../../../../../@core/common/src/interfaces/auth.interface';

@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: Object.values(USER_ROLE) })
  role: ROLE;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
