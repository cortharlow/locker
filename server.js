'use strict';
const express = require('express');
const logger = require('morgan');
const path = require('path');
const request     = require('request');
const bodyParser  = require('body-parser');
const jwt = require('jsonwebtoken');
let config = require('./config');
const app = express();
const secret = config.secret;
const key = config.key;
let server = require('http').createServer(app);

// Require routes
let articleRoutes = require('./routes/articleRoutes');
let userRoutes = require('./routes/userRoutes');

// Add Angular and Underscore
app.use('/scripts', express.static(__dirname + '/node_modules/angular'))
app.use('/scripts', express.static(__dirname + '/node_modules/underscore'))

// Set up app and body parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Require models
let Article = require('./models/Article');
let User = require('./models/User')

// Create mongoose connection
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/locker');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Database Connection Established');
});

// Specify routing
app.use('/article', articleRoutes);
app.use('/user', userRoutes);

app.get('/api/:url', (req, res) => {
  console.log('Hit API search');

  let apiUrl = 'http://api.embed.ly/1/extract?key=' + config.key + '&url=' + req.params.url;

  request(apiUrl, (err, response, body) => {
    let info = JSON.parse(body);

    res.send(info);
  });
});

server.listen(3000, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('express running', host, port);
});
