'use strict';
let express         = require('express');
let router          = express.Router();
let bodyParser      = require('body-parser');
let methodOverride  = require('method-override');
let article         = require('../controllers/articles');

router.route('/article/:id')
  .delete(article.destroy);

router.route('/article/:user')
  .get(article.get)
  .post(article.create);

module.exports = router;
