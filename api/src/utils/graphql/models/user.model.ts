import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Field()
  @Prop({ unique: true })
  userId: string;

  @Field()
  @Prop({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Prop()
  password?: string;

  @Field({ defaultValue: 0.0 })
  @Prop()
  tokens: number;

  @Field()
  @Prop({ nullable: true })
  imageURI?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
