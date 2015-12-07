'use strict';
const request     = require('request');
const bodyParser  = require('body-parser');
let Article = require('../models/Article');
let config = require('../config');

function create(req, res){
  let apiUrl = 'http://api.embed.ly/1/extract?key=' + config.key + '&url=' + req.params.url;
  let user = req.body.user;
  request(apiUrl, (err, response, body) => {
    let info = JSON.parse(body);
    //console.log(info);
    let newArticle = new Article({
      _userId: user,
      url: info.url,
      title: info.title,
      description: info.description,
      provider: info.provider_name,
      image: info.images[0].url
    });
    console.log(newArticle);
    newArticle.save((err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(newArticle);
      }
    });
  });
}


module.exports = {
  create: create
}
