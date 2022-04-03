import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class GetFundraiserPaginatedInput {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page: number;
}
