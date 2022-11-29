import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../service/auth.service';
import { Auth } from '../schema/auth.schema';
import { CreateUserDto, LocalLoginDto } from '../dto/auth.dto';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<Auth> {
    return await this.authService.createUser(createUserDto);
  }

  @Mutation(() => Auth)
  async localLogin(
    @Args('localLoginDto') localLoginDto: LocalLoginDto,
  ): Promise<Auth> {
    return await this.authService.localLogin(localLoginDto);
  }
}
