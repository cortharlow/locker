'use strict';
let express = require('express');
let router = express.Router();
let user = require('../controllers/users');
let expressJWT = require('express-jwt');
let config = require('../config');
let secret = config.secret;

router.route('/')
  .all(expressJWT({
    secret: secret,
    userProperty: 'auth'
  }))
  .get(user.get)
  .put(user.update)
  .delete(user.destroy);

router.route('/signup')
  .post(user.create);

router.route('/auth')
  .post(user.auth);

  // Verify protected routes
  router.use(function(req, res, next) {
    console.log('Is this being hit?');
    var token = req.body.token || req.query.token || req.headers['x-access'];
    console.log(token);
    // Decode token
    if(token) {
      jst.verify(token, secret, function(err, decoded) {
        if(err) {
          return res.json({success: false, message: 'Token Authentication Failure'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'Missing Token'
      })
    }
  });

router.route('/logout')
  .get(user.logout);

module.exports = router;
