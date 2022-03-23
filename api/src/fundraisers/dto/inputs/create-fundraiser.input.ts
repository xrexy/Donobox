import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreateFundraiserInput {
  @Field()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(50)
  title: string;

  @Field()
  @IsNotEmpty()
  @MinLength(50)
  @MaxLength(500)
  content: string;
}
