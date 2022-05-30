import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ id: true, timestamps: true })
export class TodoItem {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true, immutable: true })
  author: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  isComplete: boolean;

  @Prop({ required: true })
  isFavorite: boolean;
}

export type TodoItemDocument = TodoItem & Document;

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
