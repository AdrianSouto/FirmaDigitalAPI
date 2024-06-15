import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './entities/create.user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }

  @Query(() => [User])
  async getAll() {
    return this.usersService.getUsers();
  }

  @Query(() => User)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.getFormation(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ) {
    return this.usersService.createUser(createUserInput);
  }

}
