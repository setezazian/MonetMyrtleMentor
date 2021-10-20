import React from 'react';

const Messages = (props) => {
  const { from, body, time } = props;
  return (
    <div className="message-wrapper">
      <span className="messages-from">
        From: {from}
      </span>
      <span className="messages-message">
        Message: {body}
      </span>
      <span className="messages-time">
        {time}
      </span>
    </div>
  );
};
export default Messages;
