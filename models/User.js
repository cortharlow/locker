'use strict';
var mongoose = require('mongoose');

let user = new mongoose.Schema({
  first: {type: String, required: true},
  last: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

module.exports = mongoose.model('User', user);
