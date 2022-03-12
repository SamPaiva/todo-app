import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { AllowAny } from 'src/custom-decorators/any.decorator';
import { CreateUserCommand } from './commands/create-user/create-user.command';
import { LoginCommand } from './commands/login/login.command';

@Controller('api/users')
export class UserController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  @AllowAny()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() command: CreateUserCommand,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.commandBus.execute(command);
    res.status(HttpStatus.CREATED).json(user);
  }

  @Post('login')
  @AllowAny()
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Body() command: LoginCommand,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.commandBus.execute(command);
    res.status(HttpStatus.OK).json(result);
  }
}
