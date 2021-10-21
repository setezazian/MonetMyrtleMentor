import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import { loginProfileContext } from '../../context.jsx';

function Schedule(props) {
  const [date, setDate] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const { loginIdx, setLoginIdx } = useContext(loginProfileContext);

  useEffect(() => {
    if (date !== null) {
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
      alert('Please login');
    }
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
            <span id="timeSpacing">-</span>
            <span>
              {availability.end_time}
            </span>
            <button
              id="bookingButton"
              type="button"
              onClick={(e) => handleBooking(e, availability.availability_id, loginIdx)}
            >
              Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
