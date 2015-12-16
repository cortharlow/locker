'use strict';
const request     = require('request');
const bodyParser  = require('body-parser');
let Article       = require('../models/Article');
var env = process.env.NODE_ENV;
const key = process.env.KEY;

function create(req, res){
  console.log('HIT');
  let encodedUrl = encodeURIComponent(req.body.url);
  console.log('Encoded URL: ' + encodedUrl);
  let apiUrl = 'http://api.embed.ly/1/extract?key=' + key + '&url=' + encodedUrl;
  console.log('API URL: ' + apiUrl);
  let user = req.body.user;
  console.log('USER: ' + user);
  console.log('USER req.body.user: ' + req.body.user);
  request(apiUrl, (err, response, body) => {
    let info = JSON.parse(body);
    let newArticle;
    console.log(info);
    if (info.images[1].url) {
      newArticle = new Article({
        _userId: user,
        url: info.url,
        title: info.title,
        description: info.description,
        image: info.images[1].url,
        provider: info.provider_name
      })
    }
    else if (info.media.html) {
      newArticle = new Article({
        _userId: user,
        url: info.url,
        title: info.title,
        description: info.description,
        content: info.content,
        media: info.media.html,
        provider: info.provider_name
      })
    }
    else {
      newArticle = new Article({
        _userId: user,
        url: info.url,
        title: info.title,
        description: info.description,
        content: info.content,
        provider: info.provider_name
      });
    }
    console.log(newArticle.media);
    newArticle.save((err) => {
      if (err) {
        res.status(400).send(err);
        console.log(newArticle.title + 'Not Saved');
      } else {
        res.status(200).send(newArticle);
        console.log(newArticle.title + "Saved");
      }
    });
  });
}

function get(req, res) {
  let user = req.params.user;
  let query = Article.find({_userId: user}).sort({created_at: -1});
  query.exec((err, articles) => {
    res.send(articles);
  });
}

function destroy(req, res) {
  console.log('HIT');
  console.log(req.body);
  let articleId = req.params.id;
  Article.findOne({ _id: articleId }, (err, article) => {
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
