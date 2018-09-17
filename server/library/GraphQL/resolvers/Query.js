const books = require('./sampleData/books.json');
const authors = require('./sampleData/authors.json');

const Query = {
    book: (root, args, context, info) => {
        return books.filter(book => book.title === args.title)[0]
    },
    books: (root, args, context, info) => {
        return books;
    },
    authors: (root, args, context, info) => {
        if (!context.user) {
            // TODO: how we return a 401 unauthorized via the graphql endpoint?
            return null;
        } else {
            return authors
        }
    }
};

module.exports = Query;