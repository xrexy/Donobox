import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Donation {
  @Field()
  @Prop({ unique: true })
  donationId: string;

  @Field()
  @Prop()
  amount: number;

  @Field()
  @Prop()
  sentBy: string;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
