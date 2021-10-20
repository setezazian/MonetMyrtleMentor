const mysql = require('mysql');
const db = require('../db');

// offeringId is the one offering that
// all the availabilities are being inserted for.
//
// [availability] is an array of objects
// {startTime, endTime}
// Times are Date() format
module.exports.insertMany = (offeringId, availabilities) => new Promise((resolve, reject) => {
  const sql = 'INSERT INTO availabilities (start_time, end_time, offering_id) VALUES ';
  const sqlValues = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const timeBlock of availabilities) {
    const values = '(?, ?, ?)';
    const params = [new Date(timeBlock.startTime), new Date(timeBlock.endTime), offeringId];
    sqlValues.push(mysql.format(values, params));
  }

  let fullSql = sql;
  fullSql += sqlValues.join(',');

  db.query(fullSql, (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  });
});
