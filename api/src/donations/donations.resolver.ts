import { Args, Query, Resolver } from '@nestjs/graphql';
import { Donation } from 'src/utils/graphql/models/donation.model';
import { DonationsService } from './donations.service';

import { GetDonationArgs } from './dto/args/get-donation.args';

@Resolver()
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Query(() => Donation, { name: 'donation', nullable: true })
  async getDonation(@Args() getDonationArgs: GetDonationArgs) {
    return getDonationArgs;
  }
}
