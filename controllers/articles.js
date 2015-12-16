'use strict';
const request     = require('request');
const bodyParser  = require('body-parser');
let Article       = require('../models/Article');
let User          = require('../models/User');
var env = process.env.NODE_ENV;
const key = process.env.KEY;

function create(req, res){
  var user;
  if (req.body.email) {
    User.findOne({email: req.body.email}, (err, userObj) => {
      if (err) {
        console.log(err);
      }
      else if (userObj) {
        user = userObj._id;
      }
    })
  }
  else {
    user = req.body.user;
    console.log('USER: ' + user);
  }
  let encodedUrl = encodeURIComponent(req.body.url);
  console.log('Encoded URL: ' + encodedUrl);
  let apiUrl = 'http://api.embed.ly/1/extract?key=' + key + '&url=' + encodedUrl;
  console.log('API URL: ' + apiUrl);

  request(apiUrl, (err, response, body) => {
    let info = JSON.parse(body);
    let newArticle;
    if (info.images[1] !== undefined && info.media.type !== 'video') {
      console.log(info.images.length);
      if (info.images.length > 2){ //Article
        newArticle = new Article({
          _userId: user,
          url: info.url,
          title: info.title,
          description: info.description,
          content: info.content,
          provider: info.provider_name
        });
      }
      else {
        newArticle = new Article({ //Image
          _userId: user,
          url: info.url,
          title: info.title,
          description: info.description,
          image: info.images[1].url,
          provider: info.provider_name
        })
      }
    }
    else if (info.media.html) { //Video or GIF
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
    else { //Back up for those articles/items that have no images or media
      newArticle = new Article({
          _userId: user,
          url: info.url,
          title: info.title,
          description: info.description,
          content: info.content,
          provider: info.provider_name
        });
    }
    console.log(newArticle);
    newArticle.save((err) => {
      if (err) {
        res.status(400).send(err);
        console.log(err);
        console.log(newArticle.title + ' Not Saved');
      } else {
        res.status(200).send(newArticle);
        console.log(newArticle.title + ' Saved');
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
