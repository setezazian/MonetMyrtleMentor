require('dotenv').config();
const app = require('./app.js');

const SERVER_PORT = process.env.SERVER_PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log(`Listening at http://localhost:${SERVER_PORT}`);
});
