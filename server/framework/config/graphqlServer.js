const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('../../src/GraphQL/typedefs')(gql);
const resolvers = require('../../src/GraphQL/resolvers');
const context = ({ req }) => {
    const user = req.user;
    return { user };
};
module.exports = new ApolloServer({ typeDefs, resolvers, context });