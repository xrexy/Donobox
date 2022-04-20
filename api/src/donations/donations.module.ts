import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FundraisersModule } from 'src/fundraisers/fundraisers.module';
import { UsersModule } from 'src/users/users.module';
import {
  Donation,
  DonationSchema,
} from 'src/utils/graphql/models/donation.model';

import { DonationsController } from './donations.controller';
import { DonationsResolver } from './donations.resolver';
import { DonationsService } from './donations.service';

@Module({
  providers: [DonationsService, DonationsResolver],
  controllers: [DonationsController],
  imports: [
    UsersModule,
    FundraisersModule,
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
    ]),
  ],
})
export class DonationsModule {}
