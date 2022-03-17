import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(2)
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(5)
  password: string;

  @Field()
  @IsBoolean()
  @IsNotEmpty()
  rememberMe: boolean;
}
