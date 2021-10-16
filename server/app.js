const express = require('express');

const app = express();
const PORT = 3000;

// Router
const router = require('./routes');

// Set up routes
app.use('/', router);

module.exports = app;
