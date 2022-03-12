import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Response } from 'express';
import { CreateTodoCommand } from './commands/create-todo/create-todo.command';
import { GetTodosQuery } from './queries/get-todos/get-todos.query';

@Controller('api/todos')
export class TodoController {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() command: CreateTodoCommand,
    @Res({ passthrough: true }) res: Response,
  ) {
    const todo = await this.commandBus.execute(command);
    res.status(HttpStatus.CREATED).json(todo);
  }

  @Get()
  async getAll(@Res({ passthrough: true }) res: Response) {
    const todos = await this.queryBus.execute(new GetTodosQuery());
    res.status(HttpStatus.CREATED).json(todos);
  }
}
