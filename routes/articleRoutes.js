'use strict';
let express = require('express');
let router = express.Router();
let user = require('../controllers/usersController');
let article = require('../controllers/articlesController');
let expressJWT = require('express-jwt');

router.route('/:url')
  // .get(article.get)
  // .delete(article.destroy)
  .post(article.create);

module.exports = router;
