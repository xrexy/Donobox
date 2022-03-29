import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class GetFundraiserParam {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page: number;
}
