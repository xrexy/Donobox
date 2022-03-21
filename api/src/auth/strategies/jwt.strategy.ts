import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users/users.service';
import { jwtSecret } from '../constants';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(validationPayload: {
    email: string;
    sub: string;
    exp: number;
  }) {
    if (Date.now() >= validationPayload.exp * 1000)
      throw new HttpException('Token expired', HttpStatus.BAD_REQUEST);
    return this.usersService.getUserByEmail(validationPayload.email);
  }
}
