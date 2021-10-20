import React, { useState } from 'react';
import Schedule from '../Profile/Schedule.jsx';

const ScheduleModal = () => {
  const [overlay, setOverlay] = useState('');

  return (
    <div>
      <Schedule />
    </div>
  );
};
export default ScheduleModal;
