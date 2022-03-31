import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class GetFundraiserInput {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page: number;
}
