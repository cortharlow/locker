'use strict';
let express     = require('express');
let router      = express.Router();
let user        = require('../controllers/users');
let article     = require('../controllers/articles');
let expressJWT  = require('express-jwt');

router.route('/')
  .get(article.get)
  .delete(article.destroy);

router.route('/:url')
  .post(article.create);

module.exports = router;
