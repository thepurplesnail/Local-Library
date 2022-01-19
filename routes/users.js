var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource!! :D works now!');
});

router.get('/hello', function(req, res, next) {
  res.send('hello there! my friend!');
});

module.exports = router;