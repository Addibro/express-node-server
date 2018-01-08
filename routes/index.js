var express = require('express');
var date = require('../public/javascripts/date');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', date: date.date() });
});

module.exports = router;
