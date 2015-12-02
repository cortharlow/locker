'use strict';
let mongoose = require('mongoose');

let article = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  url: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  provider: String,
  image: String
});

module.exports = mongoose.model('Article', article);
