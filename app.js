var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catologRouter = require('./routes/catalog');


var app = express();

// connect to Sequelize ORM
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('locallib', 'root', 'WatermelonCandy14#', {
  host: 'localhost',
  dialect: 'mysql'
});

const auth = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

Promise.resolve().then(auth());



// implement middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/hello', usersRouter);
app.use('/catalog', catologRouter);

module.exports = app;
