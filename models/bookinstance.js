const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Book = require('../models/book');

const BookInstance = sequelize.define('bookinstance', {
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        isIn: [['Available', 'Maintenance', 'Loaned', 'Reserved']],
        defaultValue: 'Maintenance'
    },
    imprint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    due_back: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    url: {
        type: DataTypes.VIRTUAL,
        get(){
            return '/catalog/bookinstance/' + this.id;
        }
    }
});

Book.hasMany(BookInstance, {as: "bookinstances"});
BookInstance.belongsTo(Book, {as: "book", foreignKey: "bookId"});

module.exports = BookInstance;