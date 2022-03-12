import { Injectable } from '@nestjs/common';
import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/data/identifiable-entity.schema';
import { Todo } from 'src/entities/todo';
import { TodoStatus } from 'src/entities/todo-status';

export type TodoDocument = Todo & Document;

@Injectable()
@Schema({ collection: 'todos' })
export class TodoSchema extends IdentifiableEntitySchema {
  @Prop()
  name: string;

  @Prop()
  description?: string;

  @Prop()
  creationDate: string;

  @Prop()
  lastModification: string;

  @Prop()
  status: TodoStatus;
}
