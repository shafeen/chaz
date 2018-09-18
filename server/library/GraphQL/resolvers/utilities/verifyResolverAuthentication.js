const { AuthenticationError } = require('apollo-server-express');

const verifyResolverAuthentication = (queryResolverMap) => {
    const protectedQueryResolverMap = {};
    const queryFields = Object.keys(queryResolverMap);
    queryFields.forEach((queryField) => {
        protectedQueryResolverMap[queryField] = (root, args, context, info) => {
            if (!context.user) {
                throw new AuthenticationError('Login required!');
            } else {
                return queryResolverMap[queryField](root, args, context, info);
            }
        }
    });
    return protectedQueryResolverMap;
};

module.exports = verifyResolverAuthentication;