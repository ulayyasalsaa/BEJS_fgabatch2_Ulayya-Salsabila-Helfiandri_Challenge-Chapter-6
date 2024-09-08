var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var POOL = require('./config/db');

var INDEX_ROUTES = require('./routes/index');

var app = express();

const Sentry = require('./config/sentryConfig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());

// Check Connection to Database
// POOL.connect((err) => {
// 	if (err) {
// 		return console.error('Error acquiring client', err
// 		);
// 	}
// 	console.log('Connected to Database');
// });

app.use('/', INDEX_ROUTES);

module.exports = app;
