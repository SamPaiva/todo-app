import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Todo } from 'src/entities/todo';
import { TodoDto } from '../../../../shared/dtos/todo.dto';
import { TodoRepository } from '../../todo.repository.ts';
import { GetTodosQuery } from './get-todos.query';

@QueryHandler(GetTodosQuery)
export class GetTodosQueryHandler
  implements IQueryHandler<GetTodosQuery, TodoDto[]>
{
  constructor(
    private readonly todoRepository: TodoRepository,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async execute(): Promise<TodoDto[]> {
    const todos = await this.todoRepository.findAll();
    const todosDTO = this.mapper.mapArray(todos, TodoDto, Todo);

    return todosDTO;
  }
}
