import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthResponse } from '../../responses/auth.response';
import { AuthService } from '../../services/auth.service';
import { UserRepository } from '../../user.repository.ts';
import { LoginCommand } from './login.command';

@CommandHandler(LoginCommand)
export class LoginCommandHandler
  implements ICommandHandler<LoginCommand, AuthResponse>
{
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: LoginCommand): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(command.email);
    return await this.authService.login(user);
  }
}
