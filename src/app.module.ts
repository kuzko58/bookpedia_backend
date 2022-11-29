import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './books/book.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './globals/filters/http.filter';
import { BaseExceptionFilter } from './globals/filters/base.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/bookpedia'),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      context: ({ req, res }) => ({ req, res }),
      debug: false,
    }),
    UserModule,
    AuthModule,
    BookModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: BaseExceptionFilter },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
