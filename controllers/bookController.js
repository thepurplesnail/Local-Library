var Book = require('../models/book');
var BookGenre = require('../models/bookGenre');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');
var async = require('async');
var {check, validationResult} = require('express-validator')

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
        setTimeout(() => res.json(results), 500)
    )
    .catch(err => console.log(err))
    
};

// Display list of all books.
// GET /catalog/books
exports.book_list = async function(req, res) {
    Book.findAll({include: [{model: Author, as: 'author'}]})
    .then(result => 
        setTimeout(() => res.json(result), 500)
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
        if (results) setTimeout( () => res.json(results), 500 )
        else throw Error('Book not found :(')
        }
    ).catch(err => console.log(err));
};

// Handle book create on POST.
exports.book_create_post = [
    check('title', 'Title is requiried!').trim().isLength({min: 1}).escape(),

    check('summary').trim()
        .isLength({min: 1}).withMessage('Summary is required!').escape(),

    check('isbn', 'ISBN is required!').trim().isLength({min: 1}).escape(),

    check('author').trim()
        .isLength({min: 1}).withMessage('Author name is required!').escape(),

    check('title').custom(val  => 
        {return Book.findOne({where: {'title': val}})
        .then(val => 
            {if (val) return Promise.reject('Book already exists :(').catch(console.log)}
            )
        }
    ), 
    async (req, res) => {
        
        const err = validationResult(req);
        let bookDetails = {
            title: req.body.title,
            summary: req.body.summary,
            isbn: req.body.isbn,
            authorId: req.body.author.id,
        };
        if (!err.isEmpty()) res.json(err);
        else { 
            let book = Book.create(bookDetails).catch(console.log);
            if (req.body.genres) 
                for (let gId of req.body.genreIds) 
                    book.addGenres(Genre.findByPk(gId));
            console.log(`>>>>> Book: ${bookDetails.title} successfully added!`); 
        }
    }
];

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};
