import React, { useState } from 'react';
import Calendar from 'react-calendar';

function Schedule() {
  const [date, setDate] = useState(new Date());

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
