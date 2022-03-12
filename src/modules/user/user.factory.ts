import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityFactory } from 'src/data/entity.factory';
import { User } from 'src/entities/user';
import { UserRepository } from './user.repository.ts';

@Injectable()
export class UserFactory implements EntityFactory<User> {
  constructor(private readonly userRepository: UserRepository) {}

  async create(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashPassword = await bcrypt.hashSync(password, 10);
    const user = new User(email, firstName, lastName, hashPassword);
    await this.userRepository.create(user);
    return user;
  }
}
