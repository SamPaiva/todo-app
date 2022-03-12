import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectId } from 'mongodb';
import { Todo } from './todo';
export class User extends AggregateRoot {
  private _id: ObjectId;
  private creationDate: string;
  private lastModification: string;
  private todos: Todo[];

  constructor(
    private readonly email: string,
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly passwordHash: string,
  ) {
    super();
    this._id = new ObjectId();
    this.creationDate = new Date().toISOString();
    this.lastModification = this.creationDate;
    this.todos = [];
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getFirstName() {
    return this.firstName;
  }

  getEmail() {
    return this.email;
  }

  getLastName() {
    return this.lastName;
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

  getPasswordHash() {
    return this.passwordHash;
  }

  getTodos() {
    return this.todos;
  }
}
