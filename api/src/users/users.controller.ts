import { Controller, Get, Param } from '@nestjs/common';

import { GetUserArgs } from './dto/args/get-user.args';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  getUser(@Param() params: GetUserArgs) {
    return this.usersService.getUser({ userId: params.userId });
  }
}
