const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookGenre = require('./bookgenre');

const Book = sequelize.define('book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [0, 500]
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
      type: DataTypes.VIRTUAL,
      get(){
        return '/catalog/book/' + this._id;
      }
    }
})


Author.hasMany(Book, {as: "books"});
Book.belongsTo(Author, {foreignKey: "authorId", as: "author"});
Genre.belongsToMany(Book, {through: BookGenre, as: "books"});
Book.belongsToMany(Genre, {through: BookGenre, as: "genres"});

module.exports = Book;