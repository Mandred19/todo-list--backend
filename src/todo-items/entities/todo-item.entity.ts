import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ id: true, timestamps: true })
export class TodoItem {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  isComplete: boolean;

  @Prop({ required: true })
  isFavorite: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, immutable: true })
  author: Types.ObjectId;
}

export type TodoItemDocument = TodoItem & Document;

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
