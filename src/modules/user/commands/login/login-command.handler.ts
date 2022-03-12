import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthService } from '../../services/auth.service';
import { UserRepository } from '../../user.repository.ts';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginCommandHandler
  implements ICommandHandler<LoginCommand, { access_token: string }>
{
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: LoginCommand): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByEmail(command.email);
    return await this.authService.login(user);
  }
}
