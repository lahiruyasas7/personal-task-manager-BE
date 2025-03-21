import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './user.schema';
import { Task } from './tasks.scehma';

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true })
  categoryName: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  task?: Task[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
