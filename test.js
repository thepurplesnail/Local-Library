#! /usr/bin/env node
console.log('Testing testing 123...');

var async =  require('async');
var Book = require('./models/book');
var Author = require('./models/author');
var Genre = require('./models/genre');
var BookInstance = require('./models/bookinstance');

const sequelize = require('./database'); 
Promise.resolve().then(sequelize.auth());

var authors = []

async function authorCreate(first_name, family_name, d_birth, d_death, cb) {
    let authordetail = {first_name: first_name , family_name: family_name };
    if (d_birth) authordetail.date_of_birth = d_birth;
    if (d_death) authordetail.date_of_death = d_death;
    
    try{
        var author = await Author.create(authordetail);
        
        console.log('New Author: ' + author.full_name);
        authors.push(author);
        cb(null, author);

    } catch (err) {
        cb(err, null);
        console.log(err);
        return;
    }
    
  }

async function createAuthors(cb) {
    async.series([
        function(callback) {
            authorCreate('Patrick', 'Rothfuss', '1973-06-06', false, callback);
        },
        function(callback) {
            authorCreate('Ben', 'Bova', '1932-11-8', false, callback);
        },
        function(callback) {
            authorCreate('Isaac', 'Asimov', '1920-01-02', '1992-04-06', callback);
        },
        function(callback) {
            authorCreate('Bob', 'Billings', false, false, callback);
        },
        function(callback) {
            authorCreate('Jim', 'Jones', '1971-12-16', false, callback);
        }
        ],
        // optional callback
        cb);
}

Promise.resolve().then(createAuthors()).catch(e=> console.log(e));