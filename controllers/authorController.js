var Author = require('../models/author')
var Book = require('../models/book')
var sequelize = require('../database')
var {check, body, validationResult} = require('express-validator')

Promise.resolve().then(sequelize.auth());

const synchronize = async () => {
    await Author.sync();
    console.log("The table for the author model has been synced!");
  }
  
Promise.resolve().then(synchronize());

// Display list of all Authors.
// GET /catalog/authors
exports.author_list = function(req, res) {
    Author.findAll().then(result => 
        setTimeout(() => res.json(result), 500));
};

// Display detail page for a specific Author.
// GET /catalog/author/:id
exports.author_detail = function(req, res) {
    Author.findByPk(req.params.id, {include: {model: Book, as: 'books'}})
    .then(results => 
        setTimeout(() => res.json(results), 500));
};

// Handle Author create on POST.
// POST /catalog/author/create
exports.author_create_post = [
    // Validate and sanitize fields.
    check('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.') // author first name mandatory
    .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    check('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.') // author family name mandatory
        .isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    check('date_of_birth', 'Invalid date of birth').optional({checkFalsy: true}).isISO8601().toDate().escape(), // check DOB matches yyyy-mm-dd
    check('date_of_death', 'Invalid date of death').optional({checkFalsy: true}).isISO8601().toDate().escape(), // check DOD matches yyy-mm--dd
    
    (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) res.json(errors);
        else {
            let dateFix = date => date ? date : null;
            let author = {
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                date_of_birth: dateFix(req.body.date_of_birth),
                date_of_death: dateFix(req.body.date_of_death)
            };
            Author.create(author);
            console.log('>>>>> Author successfully added!')
            res.json('Author successfully added!');
        }
    }
    
];

// Handle Author delete on POST.
// DELETE /catalog/author/:id/delete
exports.author_delete_post = async function(req, res, next) {
    try{
        await (await Author.findByPk(req.params.id)).destroy();
        res.json('Author successfully deleted!')
    } catch (err){
        console.log('>>>>>>>>>>> ERROR DELETING AUTHOR: ' + err)
        res.json(err)
    }
};

// Display Author update form on GET.
exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};
