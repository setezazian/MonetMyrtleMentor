import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

function Schedule(props) {
  const [date, setDate] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);

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
            <span id="timeSpacing">-</span>
            <span>
              {availability.end_time}
            </span>
            <button id="bookingButton" type="button" onClick={(e) => handleBooking(e, availability.availability_id)}>Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
