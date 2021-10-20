const db = require('../db');

// create a profile given an object containing all the necessary information
function create(profile) {
  const sql = 'INSERT INTO profiles (name, photo, mentor) VALUES (?, ?, ?)';
  const params = [
    profile.name,
    profile.photo,
    profile.mentor,
  ];

  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
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
        resolve(results);
      }
    });
  });
}

module.exports = {
  create,
  getById,
};
