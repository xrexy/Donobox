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

  constructor(
    @InjectModel(Fundraiser.name) private fundraiserModel: Model<Fundraiser>,
  ) {}

  create(user: User, data: CreateFundraiserInput): Promise<Fundraiser> {
    for (let i = 0; i <= 20; i++)
      this.fundraiserModel.create({
        ...data,
        title: `${data.title} - ${i}`,
        fundraiserId: uuidv4(),
        createdBy: user.userId,
        createdOn: new Date().toDateString(),
        raised: 0.0,
      });
    return this.fundraiserModel.create({
      ...data,
      fundraiserId: uuidv4(),
      createdBy: user.userId,
      createdOn: new Date().toDateString(),
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

    if (fundraiser.createdBy !== user.userId)
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

  async getAllForUserInfinite(page = 0, limit = 10) {
    return this.fundraiserModel
      .find()
      .sort({ createdOn: -1 })
      .skip(page * limit)
      .limit(limit);
  }

  async getAllForUserPaginated(user: User, page = 0) {
    const results = await this.fundraiserModel.find({ createdBy: user.userId });
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

    if (fundraiser.createdBy !== user.userId)
      throw new HttpException(
        '[Fundraiser] createdBy and [User] userId missmatch',
        HttpStatus.BAD_REQUEST,
      );

    return this.fundraiserModel.deleteOne({ fundraiserId: data.fundraiserId });
  }
}
