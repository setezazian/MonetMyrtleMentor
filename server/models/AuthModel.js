const crypto = require('crypto');
const db = require('../db');

function create({ profileId, email, password }) {
  const salt = crypto.randomBytes(16);
  const sql = 'INSERT INTO auth (profile_id, email, password, salt) VALUES (?, ?, ?, ?)';
  const params = [profileId, email, password, salt];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, dbData) => {
      if (err) reject(err);

      resolve(dbData);
    });
  });
}

module.exports = {
  create,
};
