import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';

@Schema({ id: true, timestamps: true })
export class User {
  @Prop()
  @Expose()
  name: string;

  @Prop({ unique: true })
  @Expose()
  email: string;

  @Prop()
  @Exclude()
  password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
