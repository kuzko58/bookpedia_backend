import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
// import { NodesModule } from './nodes/nodes.module';
// import { CronModule } from './cron/cron.module';
// import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './globals/filters/http.filter';
import { BaseExceptionFilter } from './globals/filters/base.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/bookpedia'),
    // ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      context: ({ req, res }) => ({ req, res }),
      debug: false,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: BaseExceptionFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
