import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { DonationsModule } from './donations/donations.module';
import { FundraisersModule } from './fundraisers/fundraisers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/utils/graphql/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
    }),
    UsersModule,
    AuthModule,
    DonationsModule,
    FundraisersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
