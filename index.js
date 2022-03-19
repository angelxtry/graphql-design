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

  type Group {
    id: ID!
    featureSet: GroupFeatureSet
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    image: Image!
    description: String!
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeatures {
    features: [GroupFeature!]!
    applyFeaturesSeparately: Boolean!
  }

  type GroupFeature {
    feature: GroupFeatureFields!
  }

  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
    RED_PAINT
    BLACK_PAINT
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
