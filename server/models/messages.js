const db = require('../db');

module.exports = {
  getMessages() {
    const sql = 'SELECT * FROM messages WHERE from_id = 1 OR to_id = 1';
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) {
          console.log('error retrieving messages');
          reject(err);
          // callback(err);
        } else {
          console.log('successfully retrieved all messages');
          resolve(results);
          // callback(null, results);
        }
      });
    });
  },
  postMessage(body) {
    const { message } = body;
    const sql = 'INSERT INTO messages (from_id, to_id, body, time) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(sql, [1, 2, message, new Date().toISOString().slice(0, 19).replace('T', ' ')], (err, result) => {
        if (err) {
          console.log('error posting message ', err);
          reject(err);
          // callback(err);
        } else {
          console.log('successfully posted message');
          resolve(null, result);
          // callback(null, results);
        }
      });
    });
  },
};
