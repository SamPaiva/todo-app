import { Injectable } from '@nestjs/common';
import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/data/identifiable-entity.schema';
import { User } from 'src/entities/user';

export type UserDocument = User & Document;

@Injectable()
@Schema({ collection: 'users' })
export class UserSchema extends IdentifiableEntitySchema {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email?: string;

  @Prop()
  passwordHash: string;

  @Prop()
  creationDate: string;

  @Prop()
  lastModification: string;
}
