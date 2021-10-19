const db = require('../db');

// create a profile given an object containing all the necessary information
function create(profile) {
  const sql = 'INSERT INTO profiles (email, name, photo, mentor, password, salt) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [
    profile.email,
    profile.name,
    profile.photo,
    profile.mentor,
    profile.password,
    profile.salt,
  ];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(null, results);
      }
    });
  });
}

// get a profile's information by its ID (primary key)
function getById(id) {
  const sql = 'SELECT id, email, name, photo, mentor FROM profiles WHERE id = ?';
  const params = [id];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        console.log('error retrieving profile');
        reject(err, null);
      } else {
        console.log('successfully retrieved profile');
        resolve(null, results);
      }
    });
  });
}

// Using the profile's email, get its password hash and salt (for authentication reasons)
function getAuthInfo(email) {
  const sql = 'SELECT id, email, password, salt FROM profiles WHERE email = ?';
  const params = [email];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        reject(err, null);
      } else {
        resolve(null, results);
      }
    });
  });
}

module.exports = {
  create,
  getById,
  getAuthInfo,
};
