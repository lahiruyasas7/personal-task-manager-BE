import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  userName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

const UserSchema = SchemaFactory.createForClass(User);
