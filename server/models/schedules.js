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

  createBooking(booking) {
    const sql = 'INSERT INTO bookings (booked_by_student_id, availability_id) VALUES (?, ?)';
    const params = [booking.studentId, booking.availabilityId];
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) {
          console.log('error creating booking');
          reject(err);
        } else {
          console.log('successfully created a booking');
          resolve(results);
        }
      });
    });
  },

  getBooking(studentId, date, callback) {
    const sql = 'SELECT b.id AS booking_id, start_time, end_time, offering_name '
    + 'FROM availabilities a '
    + 'JOIN offerings o ON a.offering_id = o.id '
    + 'JOIN bookings b ON b.availability_id = a.id '
    + 'WHERE booked_by_student_id= ? AND Date(start_time) = ?';
    // BETWEEN '? 00:00:00' AND '? 23:59:59'';
    const params = [studentId, date];
    db.query(sql, params, (err, results) => {
      if (err) {
        console.log('error retrieving booked schedule');
        callback(err);
      } else {
        console.log('successfully retrieved booked schedule');
        callback(null, results);
      }
    });
  },

};
