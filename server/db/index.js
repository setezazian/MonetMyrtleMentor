const dbConnector = require('mysql');

const connection = dbConnector.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mentorUp',
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting to database');
  } else {
    console.log('sucessfully connected to MySQL!');
  }
});

module.exports = connection;
