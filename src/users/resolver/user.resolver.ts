import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User } from '../schema/user.schema';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}
