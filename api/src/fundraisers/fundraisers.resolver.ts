import { Args, Query, Resolver } from '@nestjs/graphql';
import { Fundraiser } from 'src/utils/graphql/models/fundraiser.model';
import { GetFundraiserArgs } from './dto/args/get-fundraiser.args';
import { FundraisersService } from './fundraisers.service';

@Resolver()
export class FundraisersResolver {
  constructor(private readonly fundraisersService: FundraisersService) {}

  @Query(() => Fundraiser, { name: 'fundraiser', nullable: true })
  async getDonation(@Args() getFundraiserArgs: GetFundraiserArgs) {
    return getFundraiserArgs;
  }
}
