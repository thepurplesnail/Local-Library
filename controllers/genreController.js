var Genre = require('../models/genre')
var Book = require('../models/book')
var async = require('async')
const sequelize = require('../database')
const {validationResult, check} = require("express-validator")
const req = require('express/lib/request')

const synchronize = async () => {
    await Genre.sync();
    console.log("The table for the Genre model has been synced!");
  }
  
Promise.resolve().then(synchronize());

// Display list of all Genre.
// GET /catalog/genres
exports.genre_list = function(req, res) {
    Genre.findAll().then(result => 
        setTimeout(() => res.json(result), 500))
};

// Display detail page for a specific Genre.
// GET /catalog/genre/:id
exports.genre_detail = function(req, res) {
    Genre.findByPk(req.params.id, {include: {model: Book, as: 'books'}})
    .then(result => 
        setTimeout(() => 
        res.json(result), 300))
    .catch(err => res.json(error))
};

// Handle Genre create on POST.
// GET /catalog/genre/create
exports.genre_create_post = [

    check('name', 'Genre name required!').trim().isLength({ min: 1 }).escape(), // genre name is required

    check('name').custom(val => {return Genre.findOne({where: {'name': val}}) 
    .then(genre => {if (genre) return Promise.reject('Genre already exists!')})}).escape(), // check new genre is unique

    (req, res, next) => {
        
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var genre = { name: req.body.name };

        // send any errors
        if (!errors.isEmpty()) {
            res.send(errors);
        }

        // otherwise create genre and send success msg
        else {
            Genre.create(genre); 
            res.json(`Genre: ${genre.name} successfully created!`);
        }
    }
];

// Handle Genre delete on DELETE.
// DELETE /catalog/genre/:id/delete
exports.genre_delete_post = async function(req, res) {
    try{
        (await Genre.findByPk(req.params.id)).destroy();
        res.json('Genre successfully deleted!');
    } catch (err){
        console.log('>>>>>>>>>>> ERROR DELETING GENRE: ' + err)
        res.json(err)
    }
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
