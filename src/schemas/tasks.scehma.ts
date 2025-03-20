import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatusEnum } from './enum';

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
}

export const TaskSchema = SchemaFactory.createForClass(Task);
