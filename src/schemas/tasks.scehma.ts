import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatusEnum } from './enum';
import { Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Task {
  @Prop({ unique: true, required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: String, enum: TaskStatusEnum, default: TaskStatusEnum.PENDING })
  status: TaskStatusEnum;

  @Prop({ type: Date, required: true })
  dueDate: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
