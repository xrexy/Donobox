import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/input/create-user.input';
import { LoginUserInput } from 'src/users/dto/input/login-user.input';

import { User } from '../utils/graphql/models/user.model';
import { AuthService } from './auth.service';
import { CurrentUser } from '../utils/current-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: LoginUserInput): Promise<{ access_token: string }> {
    return this.authService.login(data);
  }

  @UseGuards(GqlAuthGuard)
  @Get('status')
  status(@CurrentUser() user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, password, _id, ...others } = JSON.parse(JSON.stringify(user));
    return others;
  }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserInput) {
    return this.authService.register(createUserDto);
  }
}
