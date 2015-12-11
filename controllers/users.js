'use strict';
let User = require('../models/User');
let jwt = require('jsonwebtoken');
let config = require('../config');
const secret = config.secret;

function create(req, res){
  let newUser = new User(req.body);

  newUser.save((err) => {
    if (err){
      res.status(401).send(err);
    } else {
      res.status(200).send({
        success: true,
        token: jwt.sign(newUser, secret),
        user: newUser});
    }
  })
}

function get(req, res) {
  User.find({}, (err, users) => {
    res.send(users);
  });
}

function update(req, res){
  let userParams = req.body.user;
  User.findOne({email: userParams.email}, (err, user) => {
    user.update(
      { email: userParams.email },
      { email: userParams.newEmail, name: userParams.newName },
      (err, user) => {
        res.send(user);
      });
  });
}

function destroy(req, res){
  let userParams = req.body.user;
  User.findOne({ email : userParams.email }, (err, user) => {
    if (err) {
      return;
    }
    user.remove((err) => {
      res.send({ "record" : "deleted" });
    });
  });
}

function auth(req, res){
  console.log('Body: ' + req.body.email);
  User.findOne(
    {email: req.body.email}, function(err, user){
      if(err) throw err;
      if(!user) {
        res.send({success: false, message: "Authentication Failure"})
      } else {
        user.authenticate(req.body.password, function(err, isMatch) {
          if (err) {
            res.send({success: false, message: "Login Failed"})
          } else {
            var token = jwt.sign(user, secret);
            res.json({
              success: true,
              message: "Authentication Success",
              token: token,
              user: user._id
            });
          }
        });
      }
    });
  }


module.exports = {
  create: create,
  get: get,
  update: update,
  destroy: destroy,
  auth: auth
}
