'use strict';
let express = require('express');
let router = express.Router();
let use = require('../controllers/usersController');
let expressJWT = require('express-jwt');


router.route('/')
  .all(expressJWT({
    secret: secret.
    userProperty: 'auth'
  }))
  .get(user.get)
  .put(user.update)
  .delete(user.destroy);

router.route('/auth')
  .post(user.auth);

router.router('/signup')
  .post(user.create);

router.router('/logout')
  .get(user.logout);

module.exports = router;
