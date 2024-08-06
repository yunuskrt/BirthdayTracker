import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';

export type BirthdayDocument = HydratedDocument<Birthday>;

@Schema()
export class Birthday {
  @Prop({ required: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ required: true })
  date: Date;

  @Prop({default: null})
  category: string;
}

export const BirthdaySchema = SchemaFactory.createForClass(Birthday);