import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseEntityRepository } from 'src/data/base-entity.repository';
import { Todo } from 'src/entities/todo';
import { TodoSchemaFactory } from './schemas/todo-schema.factory';
import { TodoSchema } from './schemas/todo.schema';

@Injectable()
export class TodoRepository extends BaseEntityRepository<TodoSchema, Todo> {
  constructor(
    @InjectModel(TodoSchema.name)
    todoModel: Model<TodoSchema>,
    todoSchemaFactory: TodoSchemaFactory,
  ) {
    super(todoModel, todoSchemaFactory);
  }
}
