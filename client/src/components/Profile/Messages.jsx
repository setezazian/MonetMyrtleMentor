import React from 'react';

const Messages = (props) => {
  const { fromName, toName, body, time } = props;
  return (
    <div className="message-wrapper">
      <span className="messages-from">
        From: {fromName}
      </span>
      <span className="messages-to">
        To: {toName}
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
