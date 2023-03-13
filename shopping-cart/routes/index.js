var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('shop/index', { title: 'Online Shopping' });
  //var products = Product.find();
});

module.exports = router;
