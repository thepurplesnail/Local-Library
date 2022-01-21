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
        "bookCount": callback => 
            Book.count()
            .then(c => callback(null, c))
        , 
        "copiesCount": callback =>
             BookInstance.count()
             .then(c => callback(null, c))
        ,
        "availableCopiesCount": callback => 
            BookInstance.count({
                where: { 'status': 'Available' }
            }).then(c => callback(null, c))
        ,
        "authorCount": callback => 
            Author.count()
            .then(c => callback(null, c))
        ,
        "genreCount": callback => 
            Genre.count()
            .then(c => callback(null, c))

    }).then(results => 
        setTimeout(() => res.json(results), 1000)
    )
    .catch(err => console.log(err))
    
};

// Display list of all books.
// GET /catalog/books
exports.book_list = async function(req, res) {
    Book.findAll({include: [{model: Author, as: 'author'}]})
    .then(result => 
        setTimeout(() => res.json(result), 1000)
    )
};

// Display detail page for a specific book.
// GET /catalog/book/:id
exports.book_detail = function(req, res) {
    //res.send('NOT IMPLEMENTED: Book detail: ' + req.params.id);
    async.parallel({
        'book': callback => 
            Book.findByPk(req.params.id, {include: [
                {model: Author, as: 'author'},
                {model: Genre, as: 'genres'}
            ]}).then(result => callback(null, result))
        ,
        'book_instances': callback => 
            BookInstance.findAll({where: {'bookId': req.params.id}})
            .then(result => callback(null, result))
    }).then(results => {
        if (results) setTimeout( () => res.json(results), 1000 )
        else throw Error('Book not found :(')
        }
    ).catch(err => console.log(err));
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
