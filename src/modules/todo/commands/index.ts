import { CreateTodoCommandHandler } from './create-todo/create-todo-command.handler';
import { CreateTodoCommand } from './create-todo/create-todo.command';

export const Commands = [CreateTodoCommand];
export const CommandHandlers = [CreateTodoCommandHandler];
