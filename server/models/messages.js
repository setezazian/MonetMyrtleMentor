const db = require('../db');

module.exports = {
  getMessages(callback) {
    const sql = '';
    db.query(sql, (err, results) => {
      if (err) {
        console.log('error retrieving messages');
        callback(err);
      } else {
        console.log('successfully retrieved all messages');
        callback(null, results);
      }
    });
  },
};
