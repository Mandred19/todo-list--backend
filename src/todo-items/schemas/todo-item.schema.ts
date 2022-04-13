import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TodoItem {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    default: '',
  })
  description: string;

  @Prop({
    default: `${new Date()}`,
    immutable: true,
  })
  creationDate: string;

  @Prop({
    default: false,
  })
  isComplete: boolean;

  @Prop({
    default: false,
  })
  isFavorite: boolean;
}

export type TodoItemDocument = TodoItem & Document;

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
