const db = require('../db');

module.exports = {
  getOfferings(offeringId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT o.id, o.name, o.description, o.mentor_id '
        + 'FROM offerings AS o '
        + 'JOIN profiles AS p ON p.id = o.mentor_id '
        + 'WHERE p.id = ?';
      const params = [offeringId];
      db.query(sql, params, (err, results) => {
        if (err) {
          console.log('error retrieving offerings');
          reject(err)
        } else {
          console.log('successfully retrieved all offerings');
          resolve(results);
        }
      });
    })
  },
  getAllOfferings() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT o.offering_name, o.description, p.name '
        + 'FROM offerings AS o '
        + 'JOIN profiles AS p ON p.id = o.mentor_id ';
      db.query(sql, (err, results) => {
        if (err) {
          console.log('error retrieving offerings');
          reject(err)
        } else {
          console.log('successfully retrieved all offerings');
          resolve(results);
        }
      });
    })
  }
};
