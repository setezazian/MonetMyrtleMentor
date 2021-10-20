const db = require('../db');

module.exports = {
  getSchedule(date, callback) {
    // TODO
    const sql = '';
    const params = [date];
    db.query(sql, params, (err, results) => {
      if (err) {
        console.log('error retrieving schedule');
        callback(err);
      } else {
        console.log('successfully retrieved schedule');
        callback(null, results);
      }
    });
  },
};
