import { Module } from '@nestjs/common';
import { FundraisersService } from './fundraisers.service';
import { FundraisersResolver } from './fundraisers.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Fundraiser,
  FundraiserSchema,
} from 'src/utils/graphql/models/fundraiser.model';
import { FundraisersController } from './fundraisers.controller';

@Module({
  providers: [FundraisersService, FundraisersResolver],
  controllers: [FundraisersController],
  exports: [FundraisersService],
  imports: [
    MongooseModule.forFeature([
      { name: Fundraiser.name, schema: FundraiserSchema },
    ]),
  ],
})
export class FundraisersModule {}
