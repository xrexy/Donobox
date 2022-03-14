import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserInput } from 'src/users/dto/input/create-user.input';

import { User } from '../utils/graphql/models/user.model';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): { access_token: string } {
    return this.authService.login((req as any).user as User);
  }

  @UseGuards(GqlAuthGuard)
  @Get('status')
  status(@CurrentUser() user: User) {
    return user;
  }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserInput) {
    return this.authService.register(createUserDto);
  }
}
