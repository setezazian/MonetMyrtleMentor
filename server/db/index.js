const dbConnector = require('mysql');

const connection = dbConnector.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'mentorUp',
});

connection.connect((err) => {
  if (err) {
    console.log('error connecting');
  } else {
    console.log('sucessfully connected to MySQL!');
  }
});

module.exports = connection;
