import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, Max, Min } from 'class-validator';

@InputType()
export class CreateDonationInput {
  @Field(() => Number)
  @Type(() => Number)
  @IsNotEmpty()
  @Min(0)
  @Max(100000)
  amount: number;
}
