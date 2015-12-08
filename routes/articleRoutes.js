'use strict';
let express         = require('express');
let router          = express.Router();
let bodyParser      = require('body-parser');
let methodOverride  = require('method-override');
let article         = require('../controllers/articles');

router.route('/article')
  .get(article.get)
  .delete(article.destroy);

router.route('/article/:user')
  .post(article.create);

module.exports = router;
