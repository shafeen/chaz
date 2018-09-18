angular.module('basicMEAN')
.service('ApolloClientService', ['$window', function ($window) {
    let service = this;
    const ApolloClient = $window.bundleRequires.ApolloBoost.default;

    service.apolloClient = new ApolloClient();
    service.gql = $window.bundleRequires.ApolloBoost.gql;

    /**
     * @param graphqlQuery
     * @return {Promise}
     */
    service.query = function (graphqlQuery) {
        return service.apolloClient.query({
            query: graphqlQuery,
            fetchPolicy: 'no-cache'
        })
    };

    service.testQuery = function () {
        let graphqlQuery = service.gql`
            query AllBooks {
                books {
                    title
                    author {
                        name
                    }
                }
                authors {
                    name
                }
            }
        `;
        service.query(graphqlQuery)
        .then(response => console.log(response.data))
        .catch(error => console.error(error));
    };

    service.testQuery();

}]);
