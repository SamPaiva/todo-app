import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention } from '@automapper/core';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './data/mongoose-config.service';
import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import { JwtAuthGuard } from './shared/jwt-auth.guard';

@Module({
  imports: [
    AutomapperModule.forRoot({
      options: [
        {
          name: 'classes',
          pluginInitializer: classes,
          namingConventions: new CamelCaseNamingConvention(),
        },
      ],
      singular: true,
      globalNamingConventions: {
        source: new CamelCaseNamingConvention(),
        destination: new CamelCaseNamingConvention(),
      },
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    TodoModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (ref) => new JwtAuthGuard(ref),
      inject: [Reflector],
    },
  ],
})
export class AppModule {}
