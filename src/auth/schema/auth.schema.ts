import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/schema/user.schema';

@ObjectType()
export class Auth {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}
