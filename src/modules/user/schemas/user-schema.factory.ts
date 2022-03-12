import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EntitySchemaFactory } from 'src/data/entity-schema.factory';
import { User } from 'src/entities/user';
import { UserSchema } from './user.schema';

@Injectable()
export class UserSchemaFactory
  implements EntitySchemaFactory<UserSchema, User>
{
  create(user: User): UserSchema {
    return {
      _id: new ObjectId(user.getId()),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      passwordHash: user.getPasswordHash(),
      creationDate: user.getCreationDate(),
      lastModification: user.getLastModification(),
    };
  }

  createFromSchema(userSchema: UserSchema): User {
    return new User(
      userSchema.email,
      userSchema.firstName,
      userSchema.lastName,
      userSchema.passwordHash,
    );
  }
}
