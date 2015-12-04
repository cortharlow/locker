'use strict';
let express = require('express');
let router = express.Router();
let use = require('../controllers/usersController');
let expressJWT = require('express-jwt');


router.route('/')
  .get(api.get)
  .delete(api.destroy)
  .post(api.create);

module.exports = router;
