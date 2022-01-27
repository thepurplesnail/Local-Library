// connect to Sequelize ORM
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('locallib', 'root', 'WatermelonCandy14#', {
  host: 'localhost',
  dialect: 'mysql'
});

// test connection
Sequelize.prototype.auth = async function(){
  try {
    await this.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = sequelize;