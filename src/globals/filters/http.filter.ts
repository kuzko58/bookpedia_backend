import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(error: HttpException) {
    return new ApolloError(error.message);
  }
}
