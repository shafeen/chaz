module.exports = function (gql) {
    const typeDefs = gql`
        # Comments in GraphQL are defined with the hash (#) symbol.

        # This "Book" type can be used in other type declarations.
        type Book {
            title: String
            author: Author
        }

        type Author {
            name: String
            books: [Book]
        }

        # The "Query" type is the root of all GraphQL queries.
        # (A "Mutation" type will be covered later on.)
        type Query {
            book(title: String): Book
            books: [Book],
            
            """ 
            **Authentication Required** 
            """
            authors: [Author]
        }
    `;
    return typeDefs;
};
