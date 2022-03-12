import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserProfile } from 'src/shared/profiles/user.profile';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { LocalStrategy } from 'src/shared/strategies/local.strategy';
import { CommandHandlers, Commands } from './commands';
import { UserSchemaFactory } from './schemas/user-schema.factory';
import { UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';
import { UserController } from './user.controller';
import { UserFactory } from './user.factory';
import { UserRepository } from './user.repository.ts';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    UserProfile,
    UserRepository,
    UserFactory,
    UserSchemaFactory,
    LocalStrategy,
    JwtStrategy,
    ...Commands,
    ...CommandHandlers,
  ],
  controllers: [UserController],
})
export class UserModule {}
