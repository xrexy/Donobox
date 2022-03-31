import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class UpdateFundraiserInput {
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

  @Field()
  @IsNotEmpty()
  @IsString()
  fundraiserId: string;
}
