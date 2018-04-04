require('./config/config');

const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');

// Creates our express app
const app = express();

// Mongoose's build in promise library is deprecated, replace it with ES6 Promise
mongoose.Promise = global.Promise;

// Connect to MongoDB isntance and log a mess on success or failure
mongoose.connect(process.env.MONGODB_URI).then(
	() => console.log('Connected to MongoLab instance.'),
	err => console.log('Error connecting to MongoLab.')
);

// Configures express to use sessions
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'oafaw23rlajf',
	store: new MongoStore({
		url: process.env.MONGODB_URI,
		autoReconnect: true
	})
}));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Tell Express to pass on any request made to the '/graphql' route to the GraphQL instance
app.use('/graphql', expressGraphQL({
	schema,
	graphiql: true
}));

// const webpackMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const webpackConfig = require('../webpack.config.js');
// app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
