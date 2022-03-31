import { InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class DeleteFundraiserInput {
  @IsString()
  @IsNotEmpty()
  fundraiserId: string;
}
