const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Genre = sequelize.define('genre', {
    name: {
        type: DataTypes.STRING,
        allowNull : false,
        len: [3, 100]
    },
    url: {
      type: DataTypes.VIRTUAL,
      get(){
        return '/catalog/genre/' + this._id;
      }
    }
})

module.exports = Genre;