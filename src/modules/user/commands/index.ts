import { CreateUserCommandHandler } from './create-user/create-user-command.handler';
import { CreateUserCommand } from './create-user/create-user.command';
import { LoginCommandHandler } from './login/login-command.handler';
import { LoginCommand } from './login/login.command';

export const Commands = [CreateUserCommand, LoginCommand];
export const CommandHandlers = [CreateUserCommandHandler, LoginCommandHandler];
