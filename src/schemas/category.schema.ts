import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  categoryName: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
