'use strict';
const express = require('express');
const logger = require('morgan');
const request     = require('request');
const bodyParser  = require('body-parser');
const app = express();

app.use('/scripts', express.static(__dirname + '/node_modules/angular'))
app.use('/scripts', express.static(__dirname + '/node_modules/underscore'))

app.use('/', express.static('public'))

//Test routes

app.get('/api/:url', (req, res) => {
  console.log('Hit API search');

  let apiUrl = 'http://api.embed.ly/1/extract?key=&<key>url=' + req.params.url;

  request(apiUrl, (err, response, body) => {
    let info = JSON.parse(body);

    res.send(info);
  });
});

const server = app.listen(3000, () => {
  console.log('Server running...')
})
