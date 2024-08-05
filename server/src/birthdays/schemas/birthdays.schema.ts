import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BirthdayDocument = HydratedDocument<Birthday>;

@Schema()
export class Birthday {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  date: Date;

  @Prop({default: null})
  category: string;
}

export const BirthdaySchema = SchemaFactory.createForClass(Birthday);