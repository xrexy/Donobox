import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fundraiser } from 'src/utils/graphql/models/fundraiser.model';
import { User } from 'src/utils/graphql/models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateFundraiserInput } from './dto/inputs/create-fundraiser.input';

import { DeleteFundraiserInput } from './dto/inputs/delete-fundraiser.input';
import { UpdateFundraiserInput } from './dto/inputs/update-fundraiser.input';

@Injectable()
export class FundraisersService {
  CHUNK_SIZE = 4;
  BROWSE_CHUNK_SIZE = 12;

  constructor(
    @InjectModel(Fundraiser.name) private fundraiserModel: Model<Fundraiser>,
  ) {}

  getFundraiser = (fundraiserId: string) =>
    this.fundraiserModel.findOne<Fundraiser>({ fundraiserId });

  create(user: User, data: CreateFundraiserInput): Promise<Fundraiser> {
    const date = new Date();
    return this.fundraiserModel.create({
      ...data,
      fundraiserId: uuidv4(),
      createdBy: user.email,
      createdOn: `${date.toDateString()} ${date.getHours()}:${date.getMinutes()}`,
      raised: 0.0,
    });
  }

  async update(user: User, data: UpdateFundraiserInput) {
    const fundraiser: Fundraiser = await this.fundraiserModel.findOne({
      fundraiserId: data.fundraiserId,
    });

    if (!fundraiser)
      throw new HttpException(
        'No fundraiser exists with that ID',
        HttpStatus.BAD_REQUEST,
      );

    if (fundraiser.createdBy !== user.email)
      throw new HttpException(
        '[Fundraiser] createdBy and [User] userId missmatch',
        HttpStatus.BAD_REQUEST,
      );

    return this.fundraiserModel.updateOne(
      { fundraiserId: data.fundraiserId },
      {
        $set: {
          ...data,
        },
      },
    );
  }

  async getAllPaginated(page = 0) {
    const results = await this.fundraiserModel.find().sort({ createdOn: -1 });
    const pages = [];
    for (let i = 0; i < results.length; i += this.BROWSE_CHUNK_SIZE) {
      pages.push(results.slice(i, i + this.BROWSE_CHUNK_SIZE));
    }

    return {
      data: pages[page],
      hasNextPage: !!pages[page + 1],
      hasPreviousPage: !!pages[page - 1],
      pages: pages.length,
    };
  }

  async getAllForUserPaginated(user: User, page = 0) {
    const results = await this.fundraiserModel
      .find({ createdBy: user.userId })
      .sort({ createdOn: -1 });
    const pages = [];
    for (let i = 0; i < results.length; i += this.CHUNK_SIZE) {
      pages.push(results.slice(i, i + this.CHUNK_SIZE));
    }

    return {
      data: pages[page],
      hasNextPage: !!pages[page + 1],
      hasPreviousPage: !!pages[page - 1],
      pages: pages.length,
    };
  }

  getAllForUser = (user: User) =>
    this.fundraiserModel.find({ createdBy: user.userId });

  async deleteFundraiser(user: User, data: DeleteFundraiserInput) {
    const fundraiser = await this.fundraiserModel.findOne({
      fundraiserId: data.fundraiserId,
    });

    if (!fundraiser)
      throw new HttpException(
        'No fundraiser exists with that ID',
        HttpStatus.BAD_REQUEST,
      );

    if (fundraiser.createdBy !== user.email)
      throw new HttpException(
        '[Fundraiser] createdBy and [User] userId missmatch',
        HttpStatus.BAD_REQUEST,
      );

    return this.fundraiserModel.deleteOne({ fundraiserId: data.fundraiserId });
  }
}
