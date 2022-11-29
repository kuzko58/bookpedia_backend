import {
  createParamDecorator,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const gqlCtx = GqlExecutionContext.create(ctx);
    const { userInfo } = gqlCtx.getContext().req;

    if (!userInfo) throw new UnauthorizedException('User not authenticated');

    return userInfo;
  },
);
