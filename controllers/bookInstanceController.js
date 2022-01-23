var BookInstance = require('../models/bookinstance')
var Book = require('../models/book')
const sequelize = require('../database')
var async = require('async')

Promise.resolve().then(sequelize.auth())

const synchronize = async () => {
    try{
        await BookInstance.sync();
        console.log("The table for the BookInstance model has been synced!")
    } catch (err) { console.log (err) }
}
  
Promise.resolve().then(synchronize());

// Display list of all BookInstances.
// GET /catalog/bookinstances
exports.bookinstance_list = function(req, res) {
    BookInstance.findAll({
        include: {model: Book, as: 'book'}
    })
    .then(result => 
        setTimeout(() => res.json(result), 1000))
    .catch(err => res.send(err))
}

// Display detail page for a specific BookInstance.
// GET /catalog/bookinstance/:id
exports.bookinstance_detail = function(req, res) {
    BookInstance.findByPk(req.params.id, {include: {model: Book, as: 'book'}})
    .then(result => res.json(result));
};

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance create GET');
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
};

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};
