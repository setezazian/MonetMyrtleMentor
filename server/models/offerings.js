const db = require('../db');

module.exports = {
  getOfferings(offeringId, callback) {
    const sql = 'SELECT o.id, o.name, o.description, o.mentor_id '
    + 'FROM offerings AS o '
    + 'JOIN profiles AS p ON p.id = o.mentor_id '
    + 'WHERE p.id = ?';
    const params = [offeringId];
    db.query(sql, params, (err, results) => {
      if (err) {
        console.log('error retrieving offerings');
        callback(err);
      } else {
        console.log('successfully retrieved all offerings');
        callback(null, results);
      }
    });
  },
};
