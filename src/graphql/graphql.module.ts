import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule as GraphQL } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQL.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: {
        origin: '*',
        credentials: true,
      },
      sortSchema: true,
      playground: true,
      introspection: true,
      debug: true,
    }),
  ],
  exports: [GraphQL],
})
export class GraphqlModule {}
