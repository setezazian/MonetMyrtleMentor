const db = require('../db');

module.exports = {
  getOfferings(offeringId) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT o.id, o.offering_name, o.description, o.mentor_id, p.photo '
        + 'FROM profiles AS p'
        + 'JOIN offerings AS o ON p.id = o.mentor_id '
        + 'WHERE p.id = ?';
      const params = [offeringId];
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
  getAllOfferings() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT o.id AS offering_id, o.offering_name, o.description, p.name, p.photo, r.rating, o.mentor_id '
        + 'FROM offerings AS o '
        + 'JOIN profiles AS p ON p.id = o.mentor_id '
        + 'LEFT JOIN ratings as r  ON o.mentor_id = r.mentor_id ';
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
      const sql = `${'SELECT o.offering_name, o.description, p.name, p.photo, r.rating, o.mentor_id '
      + 'FROM offerings AS o '
      + 'JOIN profiles AS p ON p.id = o.mentor_id '
      + 'LEFT JOIN ratings as r  ON o.mentor_id = r.mentor_id '
      + 'WHERE o.id IN ('}${
        extraStr
      })`;
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
  searchOfferings(searchTerm) {
    return new Promise((resolve, reject) => {
      // search through the mentor name, offering name, offering description
      const sql = 'SELECT o.id AS offering_id, o.offering_name, o.description, p.name, p.photo, r.rating, o.mentor_id '
      + 'FROM offerings AS o '
      + 'JOIN profiles AS p ON p.id = o.mentor_id '
      + 'LEFT JOIN ratings as r  ON o.mentor_id = r.mentor_id '
      // + `WHERE p.name LIKE '%?%' OR o.offering_name LIKE '%?%' OR o.description LIKE '%?%'`;
      + `WHERE p.name LIKE '%${searchTerm}%' OR o.offering_name LIKE '%${searchTerm}%' OR o.description LIKE '%${searchTerm}%'`;
      console.log('sql', sql);

      db.query(sql, (err, results) => {
        if (err) {
          console.log('error searching offerings');
          reject(err);
        } else {
          console.log('searched and retrieved matching offerings');
          resolve(results);
        }
      });
    });
  },
  insertOne(offering) {
    return new Promise((resolve, reject) => {
      // offering is an object
      // {name, description, mentor_id}
      const sql = 'INSERT INTO offerings (offering_name, description, mentor_id) VALUES (?, ?, ?)';
      const params = [offering.name, offering.description, offering.mentor_id];
      db.query(sql, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};
