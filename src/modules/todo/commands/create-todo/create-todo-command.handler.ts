import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Todo } from 'src/entities/todo';
import { Result } from 'src/shared/base/result';
import { TodoDto } from '../../../../shared/dtos/todo.dto';
import { TodoFactory } from '../../todo.factory';
import { CreateTodoCommand } from './create-todo.command';
@CommandHandler(CreateTodoCommand)
export class CreateTodoCommandHandler
  implements ICommandHandler<CreateTodoCommand, Result<TodoDto>>
{
  constructor(
    private readonly todoFactory: TodoFactory,
    private readonly eventPublisher: EventPublisher,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async execute(command: CreateTodoCommand): Promise<Result<TodoDto>> {
    const { name, description } = command;
    const todo = this.eventPublisher.mergeObjectContext(
      await this.todoFactory.create(name, description),
    );
    todo.commit();
    const dto = this.mapper.map(todo, TodoDto, Todo);
    return new Result<TodoDto>(dto, []);
  }
}
