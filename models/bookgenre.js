const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
var Book = require('./book');
const Genre = require('./genre');

const BookGenre = sequelize.define('book_genre', {
    
    genreId: {
        type: DataTypes.INTEGER,
        references: {
            model: Genre,
            primarynKey: true
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            primarynKey: true
        }
    } 
});

module.exports = BookGenre;
