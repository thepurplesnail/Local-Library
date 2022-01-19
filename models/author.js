// Defines model called Author and represents the table Author in the database
const { get } = require('express/lib/response');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Author = sequelize.define('author', {
  // Model attributes are defined here
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    len: [0, 100]
  },
  family_name: {
    type: DataTypes.STRING,
    allowNull: false,
    len: [0, 100]            
    
  },
  // virtual for author full name
  full_name: {
    type: DataTypes.VIRTUAL,
    get() {
      if (this.first_name && this.family_name) return `${this.first_name} ${this.family_name}`;
      return "";
    }
  },
  date_of_birth: {
      type: DataTypes.DATE
  },
  date_of_death: {
      type: DataTypes.DATE
  },
  // virtual for author lifespan
  lifespan: {
    type: DataTypes.VIRTUAL,
    get() {
      let lifetime = "";
      if (this.date_of_birth) lifetime += this.date_of_birth;
      lifetime += " - ";
      if (this.date_of_death) lifetime += this.date_of_death;
      return lifetime;
    }
  },
  url: {
    type: DataTypes.VIRTUAL,
    get(){
      return '/catalog/author/' + this._id;
    }
  }
});

module.exports = Author;