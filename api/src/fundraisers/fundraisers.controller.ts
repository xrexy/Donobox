import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Query,
  Delete,
  Param,
  Request,
} from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentUser } from 'src/utils/current-user.decorator';
import { User } from 'src/utils/graphql/models/user.model';
import { GetFundraiserArgs } from './dto/args/get-fundraiser.arg';
import { CreateFundraiserInput } from './dto/inputs/create-fundraiser.input';

import { DeleteFundraiserInput } from './dto/inputs/delete-fundraiser.input';
import { GetFundraiserPaginatedInput } from './dto/inputs/get-fundraiser-paginated.input';
import { GetFundraiserInput } from './dto/inputs/get-fundraiser.input';
import { UpdateFundraiserInput } from './dto/inputs/update-fundraiser.input';
import { FundraisersService } from './fundraisers.service';

@Controller('fundraisers')
export class FundraisersController {
  private readonly MAX_POSTS = 20;

  constructor(private readonly fundraisersService: FundraisersService) {}

  @Get(':fundraiserId')
  getUser(@Param() params: GetFundraiserArgs) {
    return this.fundraisersService.getFundraiser(params.fundraiserId);
  }

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
  @Post('update')
  async updateFundraiser(
    @CurrentUser() user: User,
    @Body() data: UpdateFundraiserInput,
  ) {
    return this.fundraisersService.update(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Get('/for-user/paginated')
  getAllUserFundraisersPaginated(
    @CurrentUser() user: User,
    @Query() params: GetFundraiserInput,
  ) {
    return this.fundraisersService.getAllForUserPaginated(user, params.page);
  }

  @UseGuards(GqlAuthGuard)
  @Get('/for-all/paginated')
  getAllFundraisersPaginatedNew(@Query() params: GetFundraiserPaginatedInput) {
    return this.fundraisersService.getAllPaginated(params.page);
  }

  @UseGuards(GqlAuthGuard)
  @Get('/for-user')
  getAllUserFundraisers(@CurrentUser() user: User) {
    return this.fundraisersService.getAllForUser(user);
  }

  @UseGuards(GqlAuthGuard)
  @Delete('delete/:fundraiserId')
  deleteFundraiser(
    @CurrentUser() user: User,
    @Param() param: DeleteFundraiserInput,
  ) {
    return this.fundraisersService.deleteFundraiser(user, param);
  }
}
