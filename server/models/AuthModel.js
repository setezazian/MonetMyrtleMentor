const crypto = require('crypto');
const db = require('../db');

function create({ profileId, email, password }) {
  const salt = crypto.randomBytes(16);

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (errCrypto, hashedPassword) => {
      if (errCrypto) {
        reject(errCrypto);
        return;
      }

      const sql = 'INSERT INTO auth (profile_id, email, password, salt) VALUES (?, ?, ?, ?)';
      const params = [profileId, email, hashedPassword.toString('hex'), salt.toString('hex')];
      db.query(sql, params, (err, dbData) => {
        if (err) {
          reject(err);
        } else {
          resolve(dbData);
        }
      });
    });
  });
}

module.exports = {
  create,
};
