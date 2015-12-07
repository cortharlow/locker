'use strict';
let express = require('express');
let router = express.Router();
let user = require('../controllers/users');
let article = require('../controllers/articles');
let expressJWT = require('express-jwt');

router.route('/:url')
  // .get(article.get)
  // .delete(article.destroy)
  .post(article.create);

module.exports = router;
