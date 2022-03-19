var BookInstance = require('../models/bookinstance')
var Book = require('../models/book')
const sequelize = require('../database')
var async = require('async')
var {check, validationResult} = require('express-validator')

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
    // find all book instances in DB and their respective book
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

// Handle BookInstance create on POST.
// POST /catalog/bookinstance/create
exports.bookinstance_create_post = [
    // validate and sanitize fields
    check('bk.title', 'Book is required!').trim().isLength({min: 1}),
    check('imprint', 'Imprint is required!').trim().isLength({min: 1}),
    check('due_back', 'Invalid date!').optional({checkFalsy: true}).isISO8601().escape(),
    check('status', 'Status is required!').isLength({min: 1}),
    async (req, res) => {

        const errors = validationResult(req);

        // create new bookInstance json object
        let bkInstDtls = {
            bookId: req.body.bk.id,
            imprint: req.body.imprint,
            due_back: (req.body.due_back ? req.body.due_back : undefined),
            status: req.body.status
        }

        if (!errors.isEmpty()) res.json(errors);
        // create book if no errors
        else {
            await BookInstance.create(bkInstDtls).catch(console.log);
            console.log(`>>>>>>>>>>>>>>>> Book copy ${req.body.bk.title} successfully created!`);
            res.json(`New copy for ${req.body.bk.title} has been added!`);
        }
    }
];

// Handle BookInstance delete on DELETE
// DELETE /catalog/bookinstance/:id/delete
exports.bookinstance_delete_post = async function(req, res) {
    try{
        // find and delete book instance
        await (await BookInstance.findByPk(req.params.id)).destroy();
        res.json('Book instance successfully deleted!');
    } catch (err){
        console.log('>>>>>>>>>>> ERROR DELETING BOOK INSTANCE: ' + err)
        res.json(err)
    }
};

// Handle bookinstance update on PUT.
exports.bookinstance_update_post = [
    // validate and sanitize fields
    check('bk.title', 'Book is required!').trim().isLength({min: 1}),
    check('imprint', 'Imprint is required!').trim().isLength({min: 1}),
    check('due_back', 'Invalid date!').optional({checkFalsy: true}).isISO8601().escape(),
    check('status', 'Status is required!').isLength({min: 1}),
    async (req, res) => {

        const errors = validationResult(req);

        // create new bookInstance json object
        let bkInstDtls = {
            bookId: req.body.bk.id,
            imprint: req.body.imprint,
            due_back: (req.body.due_back ? req.body.due_back : undefined),
            status: req.body.status
        }

        if (!errors.isEmpty()) res.json(errors);
        // create book if no errors
        else {
            let bookInstance = await BookInstance.findByPk(req.params.id);
            bookInstance.set(bkInstDtls);
            await bookInstance.save();
            console.log(`>>>>>>>>>>>>>>>> Book copy for ${req.body.bk.title} successfully updated!`);
            res.json(`Copy for ${req.body.bk.title} has been updated!`);
        }
    }
];