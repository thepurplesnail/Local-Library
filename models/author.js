const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('Author', {
  // Model attributes are defined here
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
    len: [0, 100]
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
    len: [0, 100]            
    
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    }
  },
  date_of_birth: {
      type: DataTypes.DATE
  },
  date_of_death: {
      type: DataTypes.DATE
  }
}, {
  // Other model options go here
  freezeTableName: true
});
