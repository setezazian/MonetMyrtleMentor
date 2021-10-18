const express = require('express');
const path = require('path');

const app = express();

// Handle JSON and query strings
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));

// Serve site/client from root path
app.use(express.static(path.resolve('client', 'dist')));

// Router
const apiRouter = require('./apiRouter');
const reactRouter = require('./reactRouter');

// Set up routes
app.use('/api', apiRouter);
app.use('/', reactRouter);

module.exports = app;
