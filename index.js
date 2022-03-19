import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }
  
  type Mutation {
    deleteGroup(id: ID!)
    publishGroup(id: ID!)
    unPublishGroup(id: ID!)
    addCars(groupId: ID!, carID: ID!)
    removeCars(groupId: ID!, carID: ID!)
    createGroup(
      groupInput: GroupInput!
    )
    updateGroup(
      groupId: ID!
      groupInput: GroupInput!
    ): GroupUpdatePayload!
  }
  
  type GroupUpdatePayload {
    userErrors: [UserErrors]!
    group: Group
  }
  
  type UserErrors {
    message: String!
    field: [String!]!
  }
  
  input GroupInput {
    name: String
    image: ImageInput
    description: String
    featureSet: GroupFeatureFields
  }
  
  input ImageInput {
    url: String!
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
