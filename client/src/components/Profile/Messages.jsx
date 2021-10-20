import React from 'react';

const Messages = (props) => {
  const { name, from, body, time } = props;
  return (
    <div className="message-wrapper">
      <span className="messages-from">
        From: {name}
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
