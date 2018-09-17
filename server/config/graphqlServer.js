const { ApolloServer, gql } = require('apollo-server-express');
const typeDefs = require('../library/GraphQL/typedefs')(gql);
const resolvers = require('../library/GraphQL/resolvers');
const context = ({ req }) => {
    const user = req.user;
    return { user };
};
module.exports = new ApolloServer({ typeDefs, resolvers, context });