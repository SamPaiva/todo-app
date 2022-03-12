import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { TodoProfile } from 'src/shared/profiles/todo.profile';
import { CommandHandlers, Commands } from './commands';
import { Queries, QueryHandlers } from './queries';
import { TodoSchemaFactory } from './schemas/todo-schema.factory';
import { TodoSchema } from './schemas/todo.schema';
import { TodoController } from './todo.controller';
import { TodoFactory } from './todo.factory';
import { TodoRepository } from './todo.repository.ts';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: TodoSchema.name,
        schema: SchemaFactory.createForClass(TodoSchema),
      },
    ]),
  ],
  providers: [
    TodoProfile,
    TodoRepository,
    TodoFactory,
    TodoSchemaFactory,
    ...Commands,
    ...CommandHandlers,
    ...Queries,
    ...QueryHandlers,
  ],
  controllers: [TodoController],
})
export class TodoModule {}
