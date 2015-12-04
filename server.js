'use strict';
const express = require('express');
const logger = require('morgan');
const request     = require('request');
const bodyParser  = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const server = require('http').createServer(app);

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

// Require routes
app.use('/api', apiRoutes);
app.use('/users', userRoutes);

app.get('/api/:url', (req, res) => {
  console.log('Hit API search');

  let apiUrl = 'http://api.embed.ly/1/extract?key=&url=' + req.params.url;

  request(apiUrl, (err, response, body) => {
    let info = JSON.parse(body);

    res.send(info);
  });
});

const server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('Server running...', host, port);
})
