import { Catch, ExceptionFilter } from '@nestjs/common';
import { ApolloError } from 'apollo-server-core';

@Catch(Error)
export class BaseExceptionFilter implements ExceptionFilter {
  catch() {
    return new ApolloError('Something went wrong', 'Server error');
  }
}
