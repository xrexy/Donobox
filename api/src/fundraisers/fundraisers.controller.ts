import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/utils/current-user.decorator';
import { User } from 'src/utils/graphql/models/user.model';

import { CreateFundraiserInput } from './dto/inputs/create-fundraiser.input';
import { PaginationParams } from './dto/params/pagination.param';
import { FundraisersService } from './fundraisers.service';

@Controller('fundraisers')
export class FundraisersController {
  constructor(private readonly fundraisersService: FundraisersService) {}

  @UseGuards(GqlAuthGuard)
  @Post('create')
  async newFundraiser(
    @CurrentUser() user: User,
    @Body() data: CreateFundraiserInput,
  ): Promise<{ fundraiserId: string }> {
    const created = await this.fundraisersService.create(user, data);
    return {
      fundraiserId: created.fundraiserId,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Get('getAllUserFundraisers')
  async getAllUserFundraisers(
    @CurrentUser() user: User,
    @Query() paginationParams: PaginationParams,
  ) {
    return this.fundraisersService.findAll(
      user,
      paginationParams.skip,
      paginationParams.limit,
    );
  }
}
