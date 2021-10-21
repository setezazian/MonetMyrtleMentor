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
            <span>
              {availability.end_time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
