var Genre = require('../models/genre')
var Book = require('../models/book')
var async = require('async')
const sequelize = require('../database')

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
    //res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
    Genre.findByPk(req.params.id, {include: {model: Book, as: 'books'}})
    .then(result => 
        setTimeout(() => 
        res.json(result), 300))
    .catch(err => res.json(error))
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create GET');
};

// Handle Genre create on POST.
exports.genre_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre create POST');
};

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
