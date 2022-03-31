import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class Fundraiser {
  @Field()
  @Prop({ unique: true })
  fundraiserId: string;

  @Field()
  @Prop()
  createdBy: string;

  @Field()
  @Prop()
  createdOn: string;

  @Field()
  @Prop({ minlength: 10, maxlength: 50 })
  title: string;

  @Field()
  @Prop({ minlength: 50 })
  content: string;

  @Field()
  @Prop({ min: 0, default: 0 })
  raised: number;
}

export const FundraiserSchema = SchemaFactory.createForClass(Fundraiser);
