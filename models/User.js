'use strict';
var mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let user = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

user.pre('save', function(next) {
  let userCrypt = this;
  bcrypt.genSalt(12, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(userCrypt.password, salt, function(err, hashedPassword) {
      if (err) return next(err);
      userCrypt.password = hashedPassword;
      next();
    });
  });
});

user.methods.authenticate = function(password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', user);
