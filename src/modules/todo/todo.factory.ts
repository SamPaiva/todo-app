import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/data/entity.factory';
import { Todo } from 'src/entities/todo';
import { TodoRepository } from './todo.repository.ts';

@Injectable()
export class TodoFactory implements EntityFactory<Todo> {
  constructor(private readonly todoRepository: TodoRepository) {}

  async create(name: string, description: string): Promise<Todo> {
    const todo = new Todo(name, description);
    await this.todoRepository.create(todo);
    return todo;
  }
}
