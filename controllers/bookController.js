var Book = require('../models/book');
var BookGenre = require('../models/bookGenre');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');
var async = require('async');

const sequelize = require('../database'); 
Promise.resolve().then(sequelize.auth());

const synchronize = async () => {
    try {
        await Book.sync();
        console.log("The table for the Book model has been synced!");
        await BookGenre.sync({alter: true});
        console.log("The table for the BookGenre model has been synced!");

    } catch(err) { console.log(err); }
}
  
Promise.resolve().then(synchronize());

// GET /catalog

exports.index = function(req, res) {
    
    async.parallel({
        "bookCount": callback => {
            Book.count().then(c => callback(null, c));
        }, 
        "copiesCount": callback => {
            BookInstance.count().then(c => callback(null, c));
        },
        "availableCopiesCount": callback => {
            BookInstance.count({
                where: { 'status': 'Available' }
            }).then(c => callback(null, c)); 
        },
        "authorCount": callback => {
            Author.count().then(c => callback(null, c)); 
        },
        "genreCount": callback => {
            Genre.count().then(c => callback(null, c));
        }
    }).then(results => res.json(results))
    .catch(err => console.log(err));  
    
};

// Display list of all books.
// GET /catalog/books
exports.book_list = async function(req, res) {
    let books = await Book.findAll();
    let arr = [];
    for (let book of books){
        let hash = {}
        for (let key in book) 
            hash[key] = book[key];
        hash['dataValues']['author'] = await Author.findByPk(book.authorId);
        arr.push(hash['dataValues']);
    }
    res.json(arr);
};

// Display detail page for a specific book.
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
