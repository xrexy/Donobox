import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetDonationArgs {
  @Field()
  @IsNotEmpty()
  donationId: string;
}
