const books = require('./sampleData/books.json');

const Author = {
    books: (author) => {
        return books.filter(book => book.author.name === author.name);
    }
};

module.exports = Author;