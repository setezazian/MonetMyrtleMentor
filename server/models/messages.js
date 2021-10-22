const db = require('../db');

module.exports = {
  getMessages(body) {
    const userId = body.loginIdx;
    const sql = `SELECT messages.id, fromprofiles.name AS fromname, fromprofiles.photo AS photo, toprofiles.name AS toname, messages.body, messages.time, messages.from_id FROM messages JOIN profiles AS fromprofiles ON messages.from_id=fromprofiles.id JOIN profiles AS toprofiles ON messages.to_id=toprofiles.id WHERE to_id = ${userId} OR from_id = ${userId} ORDER BY messages.time DESC;`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) {
          console.log('error retrieving messages');
          reject(err);
        } else {
          console.log('successfully retrieved all messages');
          resolve(results);
        }
      });
    });
  },
  postMessage(body) {
    const { message, fromUser, toId } = body;
    const sql = 'INSERT INTO messages (from_id, to_id, body, time) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      db.query(sql, [fromUser, toId, message, new Date().toISOString().slice(0, 19).replace('T', ' ')], (err, result) => {
        if (err) {
          console.log('error posting message ', err);
          reject(err);
        } else {
          console.log('successfully posted message');
          resolve(null, result);
        }
      });
    });
  },
};
