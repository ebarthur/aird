import { AbstractDocument } from '@app/common/database/abstract.schema';
import { ROLE, USER_ROLE } from '@app/common/interfaces/auth.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
