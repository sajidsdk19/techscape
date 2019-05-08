var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TechScape' });
});

router.get('/platform', function(req, res, next) {
   res.render('platform');
 });

module.exports = router;
