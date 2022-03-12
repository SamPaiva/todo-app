import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { User } from 'src/entities/user';
import { Result } from 'src/shared/base/result';
import { UserDto } from '../../../../shared/dtos/user.dto';
import { UserFactory } from '../../user.factory';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, Result<UserDto>>
{
  constructor(
    private readonly userFactory: UserFactory,
    private readonly eventPublisher: EventPublisher,
    @InjectMapper() private mapper: Mapper,
  ) {}

  async execute(command: CreateUserCommand): Promise<Result<UserDto>> {
    const { firstName, lastName, email, password } = command;
    const user = this.eventPublisher.mergeObjectContext(
      await this.userFactory.create(firstName, lastName, email, password),
    );
    user.commit();
    const dto = this.mapper.map(user, UserDto, User);
    return new Result<UserDto>(dto, []);
  }
}
