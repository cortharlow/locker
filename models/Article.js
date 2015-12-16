'use strict';
let mongoose = require('mongoose');

let article = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  url: {type: String, required: true},
  title: String,
  description: String,
  content: String,
  image: String,
  media: String,
  provider: String,
  created_at: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('Article', article);
