import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseEntityRepository } from 'src/data/base-entity.repository';
import { User } from 'src/entities/user';
import { UserSchemaFactory } from './schemas/user-schema.factory';
import { UserSchema } from './schemas/user.schema';

@Injectable()
export class UserRepository extends BaseEntityRepository<UserSchema, User> {
  constructor(
    @InjectModel(UserSchema.name)
    userModel: Model<UserSchema>,
    userSchemaFactory: UserSchemaFactory,
  ) {
    super(userModel, userSchemaFactory);
  }

  async findByEmail(email: string) {
    return this.findOne({ email: email });
  }
}
