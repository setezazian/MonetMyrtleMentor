import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';

function Schedule() {
  const [date, setDate] = useState(null);
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    axios.get('/api/schedule', {
      params: {
        date,
      },
    })
      .then((response) => {
        console.log(response);
        if (typeof (response.data) === 'object') {
          setAvailability(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
        {availability && JSON.stringify(availability[0].start_time)}
        {availability && JSON.stringify(availability[0].end_time)}
      </div>
      {/* <div>{date.toString()}</div> */}
    </div>
  );
}

export default Schedule;
