'use strict';
const express     = require('express');
var favicon       = require('serve-favicon');
let cors          = require('cors');
const logger      = require('morgan');
const path        = require('path');
const request     = require('request');
const bodyParser  = require('body-parser');
const jwt         = require('jsonwebtoken');
const app         = express();
var env           = process.env.NODE_ENV;
const secret      = process.env.SECRET;
const key         = process.env.KEY;

let server        = require('https').createServer(app);

// Require routes
let articleRoutes = require('./routes/articleRoutes');
let userRoutes    = require('./routes/userRoutes');

// Set up app and body parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Use routes
app.use(articleRoutes);
app.use(userRoutes);

// Create mongoose connection
let mongoose = require('mongoose');
var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/locker';
mongoose.connect(mongoUri);

server.listen(process.env.PORT || 5000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
