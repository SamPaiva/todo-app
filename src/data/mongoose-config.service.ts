import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  private connectionString: string;

  constructor() {
    this.connectionString = process.env.MONGO_CONNECTION;
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.connectionString,
    };
  }
}
