const express = require('express');
const path = require('path');  // Need to be removed, just for personal visualize use
const app = express();
const PORT = 3000;

// Router
const router = require('./routes');

// Set up routes
app.use('/', router);


app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));// Need to be removed, just for personal visualize use
app.use(express.json());// Need to be removed, just for personal visualize use
app.use(express.urlencoded({ extended: true }));// Need to be removed, just for personal visualize use




app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
