import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String
    make: String
  }

  type ManualGroup {
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String
    memberships: [GroupMembership!]!
  }

  type AutomaticGroup {
    id: ID!
    name: String!
    imageId: ID!
    bodyHtml: String
    memberships: [GroupMembership!]!
    feature: [AutomaticGroupFeatures!]!
    applyFeaturesSeparately
  }

  type AutomaticGroupFeatures {
    column: String!
  }
  
  type GroupMembership {
    groupId: ID!
    carId: ID!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [
        {
          id: 1,
          color: 'blue',
          make: 'Toyota',
        },
      ],
    },
  },
});

server.listen({ port: 4004 }).then(({ url }) => {
  console.log('Server start: ', url);
});
