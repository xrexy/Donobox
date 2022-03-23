import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { Donation } from 'src/utils/graphql/models/donation.model';
import { User } from 'src/utils/graphql/models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { GetDonationArgs } from './dto/args/get-donation.args';

import { CreateDonationInput } from './dto/inputs/create-donation.input';

@Injectable()
export class DonationsService {
  constructor(
    @InjectModel(Donation.name) private donationModel: Model<Donation>,
    private readonly usersService: UsersService,
  ) {}

  async createDonation(
    user: User,
    createDonationInput: CreateDonationInput,
  ): Promise<Donation> {
    const donation: Donation = {
      ...createDonationInput,
      sentBy: user.userId,
      donationId: uuidv4(),
    };

    const _user = await this.usersService.getUser({ userId: user.userId });
    if (_user) {
      await this.usersService.updateUser({
        userId: user.userId,
        tokens: _user.tokens + createDonationInput.amount / 5,
      });
    }

    return this.donationModel.create(donation);
  }

  async getDonation(args: GetDonationArgs): Promise<Donation | undefined> {
    return this.donationModel.findOne({ userId: args.donationId });
  }

  async getUserDonations(userId: string): Promise<Donation[]> {
    return this.donationModel.find({ sentBy: userId });
  }
}
