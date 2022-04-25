import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TodoItem {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ immutable: true })
  createdDate: Date;

  @Prop()
  updatedDate: Date;

  @Prop()
  isComplete: boolean;

  @Prop()
  isFavorite: boolean;
}

export type TodoItemDocument = TodoItem & Document;

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
