const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../database')
const Book = require('../models/book')
const {DateTime} = require('luxon')

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
    },
    due_back_formatted: {
        type: DataTypes.VIRTUAL,
        get() { 
            return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
        }
    }
});

Book.hasMany(BookInstance, {as: "bookinstances"});
BookInstance.belongsTo(Book, {as: "book", foreignKey: "bookId"});

module.exports = BookInstance;