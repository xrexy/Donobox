import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserInput } from 'src/users/dto/input/create-user.input';
import { LoginUserInput } from 'src/users/dto/input/login-user.input';

import { CurrentUser } from '../utils/current-user.decorator';
import { User } from '../utils/graphql/models/user.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: LoginUserInput): Promise<{ access_token: string }> {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  status(@CurrentUser() user: User): Omit<User, 'password'> {
    const _user: User = (user as any).toObject();
    delete _user.password;

    return _user;
  }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserInput) {
    return this.authService.register(createUserDto);
  }
}
