import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Task } from './tasks.scehma';
import { Category } from './category.schema';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
  tasks?: Task[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
  category?: Category[];
}

export const UserSchema = SchemaFactory.createForClass(User);
