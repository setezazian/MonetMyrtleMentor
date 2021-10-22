import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { loginProfileContext } from '../../context.jsx';

function Schedule(props) {
  const [date, setDate] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [bookings, setBookings] = useState([]);
  const { loginIdx, setLoginIdx } = useContext(loginProfileContext);

  useEffect(() => {
    if (date !== null) {
      if (props.profileId !== undefined) {
        // show schedule for profile
        axios.get('/api/profile/schedule', {
          params: {
            studentId: props.profileId,
            date,
          },
        })
          .then((response) => {
            console.log(response);
            setBookings(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // show schedule for offering
        axios.get('/api/schedule', {
          params: {
            date,
            offeringId: props.offeringId,
          },
        })
          .then((response) => {
            console.log(response);
            if (typeof (response.data) === 'object') {
              setAvailabilities(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [date]);

  const handleBooking = (e, availabilityId, studentId) => {
    e.preventDefault();
    const data = {
      studentId: loginIdx,
      availabilityId,
    };
    if (studentId !== -1) {
      console.log(studentId);
      axios.post('/api/booking', data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Please login to be able to book.');
    }
  };

  const handleBooking = (e, availabilityId) => {
    e.preventDefault();
    const data = {
      availabilityId,
    };
    axios.post('/api/booking', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="scheduling">
      <div className="calendar">
        <Calendar
          onChange={setDate}
          value={date}
        />
      </div>
      <div id="schedule" className={date === null ? 'hidden' : undefined}>
        {availabilities.map((availability) => (
          <div key={availability.availability_id}>
            <span>
              {availability.start_time}
            </span>
            <span className="timeSpacing">-</span>
            <span>
              {availability.end_time}
            </span>
            <button
              className="booking"
              type="button"
              onClick={(e) => handleBooking(e, availability.availability_id, loginIdx)}
            >
              Book
            </button>
          </div>
        ))}
        {bookings.map((booking) => (
          <div key={booking.booking_id}>
            <span>
              {booking.start_time}
            </span>
            <span className="timeSpacing">-</span>
            <span>
              {booking.end_time}
            </span>
            <span style={{ margin: '0 10px' }}>
              {booking.offering_name}
            </span>
            <button type="button">Cancel Booking</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
