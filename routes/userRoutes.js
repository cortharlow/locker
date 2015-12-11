'use strict';
let express = require('express');
let router = express.Router();
let bodyParser      = require('body-parser');
let methodOverride  = require('method-override');
let user = require('../controllers/users');
let expressJWT = require('express-jwt');
const secret = process.env.SECRET
// let config = require('../config');
// let secret = config.SECRET;

router.route('/user')
  .all(expressJWT({
    secret: secret,
    userProperty: 'auth'
  }))
  .get(user.get)
  .put(user.update)
  .delete(user.destroy);

router.route('/user/signup')
  .post(user.create);

router.route('/user/auth')
  .post(user.auth);

// Verify protected routes
router.use(function(req, res, next) {
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

module.exports = router;
