
**Express JS** 

**Helloworld**
```js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('Hello World!')
});

app.listen(port, () => console.log(`Server listening on port ${port}`)
});
```
Download nodemon on terminal to automatically update server page
 `npm install nodemon --save`
 `nodemon server.js`

**Exporting and Importing Modules**
Filename: `Mod.js`
```js
const mod = {
  area: function(width) {
    return width * width;
  },

  perimeter: function(width) {
    return 4 * width;
  }
};

module.exports = mod;
```
```js
const square = require('./Mod'); 
console.log('The area of a square with a width of 4 is ' + square.area(4));
```

**Grouping Route Handlers**
```js
// wiki.js - Wiki route module

const express = require('express');
const router = express.Router();

// Home page route
router.get('/', function(req, res) {
  res.send('Wiki home page');
});

// About page route
router.get('/about', function(req, res) {
  res.send('About this wiki');
});

module.exports = router;
```
```js
const wiki = require('./wiki.js');
// ...
app.use('/wiki', wiki);
```
**Middleware**
The only difference between a middleware function and a route handler callback is that middleware functions have a third argument `next` if they do not complete the req cycle

[Express middleware packages](https://expressjs.com/en/resources/middleware.html)

`npm install morgan`

```js
const express = require('express');
const logger = require('morgan');
const app = express();
app.use(logger('dev'));
```

**Writing middleware**
```js
var express = require('express')
var app = express()

//Add property requestTime to req object
var requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
})

app.listen(3000)
```
**Configurable Middleware**
filename: `my-middleware.js`
```js
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
```
The middleware can now be used as shown below.
```js

var mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

**Serving Static Files**
Use the line below to serve images, CSS files, and JavaScript files from a directory named 'public' at the same level as where you call node:

`app.use(express.static('public'));`

Any files in the public directory are served by adding their filename (relative to the base "public" directory) to the base URL. So for example:
```
http://localhost:3000/images/dog.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/about.html
```
You can call static() multiple times to serve multiple directories.
```
app.use(express.static('public'));
app.use(express.static('media'));
```
You can also create a virtual prefix for your static URLs, rather than having the files added to the base URL.

`app.use('/media', express.static('public'));`

Now, you can load the files that are in the `public` directory from the `/media` path prefix.

```
http://localhost:3000/media/images/dog.jpg
http://localhost:3000/media/video/cat.mp4
http://localhost:3000/media/cry.mp3
```
**Error Handling**
Must be called after all other app.use() and routes calls so that they are the last middleware in the request handling process!
```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
Add a middleware function at the very bottom of the stack (below all other functions) to handle a 404 response:
```js
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})
```
