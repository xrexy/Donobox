import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FundraisersService } from 'src/fundraisers/fundraisers.service';
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
    private readonly fundraisersService: FundraisersService,
  ) {}

  async create(
    user: User,
    createDonationInput: CreateDonationInput,
  ): Promise<Donation> {
    const donation: Donation = {
      amount: createDonationInput.amount,
      sentBy: user.email,
      donationId: uuidv4(),
    };

    const _user = await this.usersService.getUser({ userId: user.email });
    if (_user) {
      await this.usersService.updateUser({
        userId: user.email,
        tokens: _user.tokens + createDonationInput.amount / 5,
      });
    }

    const _fundraiser = await this.fundraisersService.getFundraiser(
      createDonationInput.fundraiserId,
    );
    if (_fundraiser) {
      this.fundraisersService.addRaised(
        createDonationInput.amount,
        createDonationInput.fundraiserId,
      );
    }

    return this.donationModel.create(donation);
  }

  async getDonation(args: GetDonationArgs): Promise<Donation | undefined> {
    return this.donationModel.findOne({ userId: args.donationId });
  }

  async getUserDonations(email: string): Promise<Donation[]> {
    return this.donationModel.find({ sentBy: email });
  }
}
