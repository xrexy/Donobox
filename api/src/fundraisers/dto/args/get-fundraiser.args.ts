import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetFundraiserArgs {
  @Field()
  @IsNotEmpty()
  fundraiserId: string;
}
