const books = require('./sampleData/books.json');
const authors = require('./sampleData/authors.json');
const verifyResolverAuthentication = require('./utilities/verifyResolverAuthentication');

const QueryPublic = {
    book: (root, args, context, info) => {
        return books.filter(book => book.title === args.title)[0]
    },
    books: (root, args, context, info) => {
        return books;
    }
};
const QueryProtected = verifyResolverAuthentication({
    authors: (root, args, context, info) => {
        return authors;
    }
});

const Query = Object.assign(QueryPublic, QueryProtected);
module.exports = Query;