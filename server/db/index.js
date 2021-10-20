const dbConnector = require('mysql');

const dbParams = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mentorUp',
};

const connection = dbConnector.createConnection(dbParams);

connection.connect((err) => {
  if (err) {
    console.log('error connecting to database: ', err);
  } else {
    console.log(`sucessfully connected with username "${dbParams.user}" to database "${dbParams.database}" at ${dbParams.host}:${dbParams.port}`);
  }
});

module.exports = connection;
