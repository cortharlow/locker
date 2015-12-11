'use strict';
const express     = require('express');
let cors          = require('cors');
const logger      = require('morgan');
const path        = require('path');
const request     = require('request');
const bodyParser  = require('body-parser');
const jwt         = require('jsonwebtoken');
const app         = express();
const secret = process.env.SECRET;
const key = process.env.KEY;
// let config        = require('./config');
// const secret      = config.SECRET;
// const key         = config.KEY;

let server        = require('http').createServer(app);

// Require routes
let articleRoutes = require('./routes/articleRoutes');
let userRoutes = require('./routes/userRoutes');

// Set up app and body parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use(articleRoutes);
app.use(userRoutes);

// Create mongoose connection
let mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/locker';
mongoose.connect(mongoUri);

server.listen(process.env || 3000, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log('express running', host, port);
});
