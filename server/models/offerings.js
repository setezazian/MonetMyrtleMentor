const db = require('../db');

module.exports = {
  getOfferings(offeringId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT o.id, o.offering_name, o.description, o.mentor_id '
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
    });
  },
  getAllOfferings() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT o.offering_name, o.description, p.name '
        + 'FROM offerings AS o '
        + 'JOIN profiles AS p ON p.id = o.mentor_id ';
      db.query(sql, (err, results) => {
        if (err) {
          console.log('error retrieving offerings');
          reject(err);
        } else {
          console.log('successfully retrieved all offerings');
          resolve(results);
        }
      });
    });
  },
  getMultiOfferings(offeringIds) {
    return new Promise((resolve, reject) => {
      const params = offeringIds;
      console.log('params', params);
      let extraStr = '';
      for (let i = 0; i < params.length; i++) {
        extraStr += '?';
        if (i !== params.length - 1) {
          extraStr += ',';
        }
      }
      console.log('extraStr', extraStr);
      let sql = 'SELECT o.offering_name, o.description, p.name, p.photo, r.rating '
      + 'FROM offerings AS o '
      + 'JOIN profiles AS p ON p.id = o.mentor_id '
      + 'JOIN ratings as r  ON o.mentor_id = r.mentor_id '
      + 'WHERE o.id IN ('
      +  extraStr
      + ')';
      console.log('sql', sql);

      db.query(sql, params, (err, results) => {
        if (err) {
          console.log('error retrieving offerings');
          reject(err);
        } else {
          console.log('successfully retrieved all offerings');
          resolve(results);
        }
      });
    });
  },
};
