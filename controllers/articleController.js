'use strict';
var Article = require('../models/Article');

// POST
function createArticle(request, response) {
  console.log('POST');
  console.log('Body:', request.body);

  var article = new Article(request.body);

  article.save((err) => {
    if(err) response.json({message: 'Could not save article: ' + error});

    response.json({article: article});
  });
}

// GET
function getArticle(request, response) {
}

module.exports = {
  createArticle: createArticle,
  getArticle: getArticle
}
