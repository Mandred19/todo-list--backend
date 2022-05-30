import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';

@Schema({ id: true, timestamps: true })
export class User {
  @Prop({ required: true })
  @Expose()
  name: string;

  @Prop({ required: true, unique: true })
  @Expose()
  email: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop()
  @Expose()
  avatar: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
