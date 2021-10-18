const db = require('../db');

module.exports = {
  getProfile(profileId, callback) {
    const sql = '';
    db.query(sql, (err, results) => {
      if (err) {
        console.log('error retrieving profile');
        callback(err);
      } else {
        console.log('successfully retrieved profile');
        callback(null, results);
      }
    });
  },
};
