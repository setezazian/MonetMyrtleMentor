import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';

function Schedule() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    axios.get('/api/schedule', {
      params: {
        date,
      },
    })
      .then((response) => {
        console.log(response);
        // setDate(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <div className="calendar">
        <Calendar
          onChange={setDate}
          value={date}
        />
      </div>
      <div>{date.toString()}</div>
    </div>
  );
}

export default Schedule;
