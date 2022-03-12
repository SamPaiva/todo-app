import { ObjectId } from 'mongodb';
import { TodoStatus } from 'src/entities/todo-status';

export class TodoDto {
  _id: ObjectId;
  name: string;
  description?: string;
  todoStatus: TodoStatus;
  creationDate: string;
  lastModification: string;
}
