import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CurrentUser } from '../utils/current-user.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GetUserArgs } from './dto/args/get-user.args';
import { GetUsersArgs } from './dto/args/get-users.args';
import { CreateUserInput } from './dto/input/create-user.input';
import { DeleteUserInput } from './dto/input/delete-user.input';
import { UpdateUserInput } from './dto/input/update-user.input';

import { User } from '../utils/graphql/models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@CurrentUser() user: User, @Args() getUserArgs: GetUserArgs) {
    if (!user) return;

    return this.usersService.getUser(getUserArgs);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers(@Args() getUsersArgs: GetUsersArgs) {
    return this.usersService.getUsers(getUsersArgs);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput) {
    return this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  async deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput) {
    return this.usersService.deleteUser(deleteUserData);
  }
}
