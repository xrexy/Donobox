import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fundraiser } from 'src/utils/graphql/models/fundraiser.model';
import { User } from 'src/utils/graphql/models/user.model';
import { v4 as uuidv4 } from 'uuid';

import { CreateFundraiserInput } from './dto/inputs/create-fundraiser.input';

@Injectable()
export class FundraisersService {
  constructor(
    @InjectModel(Fundraiser.name) private fundraiserModel: Model<Fundraiser>,
  ) {}

  create(user: User, data: CreateFundraiserInput): Promise<Fundraiser> {
    return this.fundraiserModel.create({
      ...data,
      fundraiserId: uuidv4(),
      createdBy: user.userId,
    });
  }
}
