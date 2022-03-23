import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/utils/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/utils/graphql/models/user.model';

import { DonationsService } from './donations.service';
import { CreateDonationInput } from './dto/inputs/create-donation.input';

@Controller('donations')
export class DonationsController {
  constructor(private readonly service: DonationsService) {}

  @UseGuards(GqlAuthGuard)
  @Post('create')
  create(@CurrentUser() user: User, @Body() data: CreateDonationInput) {
    return this.service.createDonation(user, data);
  }
}
