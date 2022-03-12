import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EntitySchemaFactory } from 'src/data/entity-schema.factory';
import { Todo } from 'src/entities/todo';
import { TodoSchema } from './todo.schema';

@Injectable()
export class TodoSchemaFactory
  implements EntitySchemaFactory<TodoSchema, Todo>
{
  create(todo: Todo): TodoSchema {
    return {
      _id: new ObjectId(todo.getId()),
      name: todo.getName(),
      description: todo.getDescription(),
      creationDate: todo.getCreationDate(),
      lastModification: todo.getLastModification(),
      status: todo.getStatus(),
    };
  }

  createFromSchema(todoSchema: TodoSchema): Todo {
    return new Todo(todoSchema.name, todoSchema.description);
  }
}
