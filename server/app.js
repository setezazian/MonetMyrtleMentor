const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const app = express();

require('./auth.js')();

// Handle 'application/json' and 'application/x-www-form-urlencoded'
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

// Serve site/client from root path
app.use(express.static(path.resolve('client', 'dist')));

// Session handling
app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000, // prune expired entries every 24h (milliseconds)
  }),
  resave: false,
  secret: process.env.SESSION_SECRET || 'keyboard cat',
}));
app.use(passport.initialize());
app.use(passport.session());

// Router
const apiRouter = require('./apiRouter');
const reactRouter = require('./reactRouter');

// Set up routes
app.use('/api', apiRouter);
app.use('/', reactRouter);

module.exports = app;
