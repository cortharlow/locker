'use strict';
const request     = require('request');
const bodyParser  = require('body-parser');
let Article       = require('../models/Article');
let config        = require('../config');

function create(req, res){
  let encodedUrl = encodeURIComponent(req.body.url);
  let apiUrl = 'http://api.embed.ly/1/extract?key=' + config.key + '&url=' + encodedUrl;
  let user = req.params.user;
  request(apiUrl, (err, response, body) => {
    console.log(body);
    let info = JSON.parse(body);
    //console.log(info);
    let newArticle = new Article({
      _userId: user,
      url: info.url,
      title: info.title,
      description: info.description,
      content: info.content,
      provider: info.provider_name
      //image: info.images.thumbnail_url
    });
    newArticle.save((err) => {
      if (err) {
        res.status(400).send(err);
        console.log(newArticle.title);
      } else {
        res.status(200).send(newArticle);
        console.log(newArticle.title + "Saved");
      }
    });
  });
}

function get(req, res) {
  Article.find({}, (err, articles) => {
    res.send(articles);
    console.log(articles);
  });
}

function destroy(req, res) {
  let articleParams = req.body.article;
  Article.findOne({ _id: articleParams.id }, (err, article) => {
    if (err) {
      return;
    }
    article.remove((err) => {
      res.send({"record" : "deleted"});
    });
  });
}

module.exports = {
  create: create,
  get: get,
  destroy: destroy
}
