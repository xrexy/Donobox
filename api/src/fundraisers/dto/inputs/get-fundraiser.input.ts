import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

@InputType()
export class GetFundraiserInput {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  page: number;
}
