import React from 'react';
import Schedule from '../Profile/Schedule.jsx';

const ScheduleModal = ({ location }) => (
  <div>
    <Schedule offeringId={location.state.offeringId} />
  </div>
);
export default ScheduleModal;
