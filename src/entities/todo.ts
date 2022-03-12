import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import { TodoStatus } from './todo-status';
export class Todo extends AggregateRoot {
  private status: TodoStatus;
  private _id: ObjectId;
  private creationDate: string;
  private lastModification: string;

  constructor(
    private readonly name: string,
    private readonly description?: string,
  ) {
    super();
    this._id = new ObjectId();
    this.creationDate = new Date().toISOString();
    this.lastModification = this.creationDate;
    this.status = TodoStatus.Pending;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getStatus() {
    return this.status;
  }

  getId() {
    return this._id;
  }

  getCreationDate() {
    return this.creationDate;
  }

  getLastModification() {
    return this.lastModification;
  }
}
