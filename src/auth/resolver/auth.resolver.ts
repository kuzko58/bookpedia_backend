import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../dto/input/create-user.input';
import { AuthService } from '../service/auth.service';
import { LoginUserInput } from '../dto/input/login-user.input';
import { AuthResponse } from '../schema/auth.schema';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async localSignUp(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<AuthResponse> {
    return this.authService.localSignUp(createUserData);
  }

  @Mutation(() => AuthResponse)
  async localSignIn(
    @Args('loginUserData') loginUserData: LoginUserInput,
  ): Promise<AuthResponse> {
    return this.authService.localSignIn(loginUserData);
  }
}
