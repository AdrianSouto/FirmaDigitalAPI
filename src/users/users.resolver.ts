import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './inputs/create.user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  async getAll() {
    return this.usersService.getUsers();
  }

  @Query(() => User)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.getUser(id);
  }

  @Mutation(() => User)
  createUser(
    @Args('newUser') newUser: CreateUserInput,
  ) {
    return this.usersService.createUser(newUser);
  }

  @Mutation(() => User)
  updateUser(
    @Args('idUser', { type: () => String }) id: string,
    @Args('newProps') newProps: CreateUserInput,
  ) {
    return this.usersService.updateUser(id, newProps);
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args('id', { type: () => String }) id: string,
  ) {
    this.usersService.deleteUser(id).catch(() => {
      return false;
    });
    return true;
  }

  @Query(() => String)
  async getToken(
    @Args('username') userName: string,
    @Args('password') password: string,
  ) {
    return this.usersService.checkUser(userName, password)
  }
}
