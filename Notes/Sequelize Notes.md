###Connecting to a database

```js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
```
e.g.
```js
// connect to Sequelize ORM
const sequelize = new Sequelize('locallib', 'root', 'WatermelonCandy14#', {
  host: 'localhost',
  dialect: 'mysql'
});

// test connection
const auth = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

Promise.resolve().then(auth());
```
