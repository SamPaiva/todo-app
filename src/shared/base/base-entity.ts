import { AggregateRoot } from '@nestjs/cqrs';

export abstract class BaseEntity extends AggregateRoot {
  protected creationDate: string;
  protected lastModification: string;
}
