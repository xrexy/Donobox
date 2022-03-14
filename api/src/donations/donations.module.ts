import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsResolver } from './donations.resolver';
import { DonationsController } from './donations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Donation,
  DonationSchema,
} from 'src/utils/graphql/models/donation.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [DonationsService, DonationsResolver],
  controllers: [DonationsController],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Donation.name, schema: DonationSchema },
    ]),
  ],
})
export class DonationsModule {}
