const db = require('../db');

module.exports = {
  getOfferingSchedule(date, offeringId, callback) {
    const sql = 'SELECT a.id AS availability_id, start_time, end_time '
    + 'FROM availabilities a JOIN offerings f ON a.offering_id = f.id '
    + 'WHERE DATE(start_time) = ? AND f.id = ?';
    const params = [date, offeringId];
    db.query(sql, params, (err, results) => {
      if (err) {
        console.log('error retrieving offering schedule');
        callback(err);
      } else {
        console.log('successfully retrieved offering schedule');
        callback(null, results);
      }
    });
  },
};
