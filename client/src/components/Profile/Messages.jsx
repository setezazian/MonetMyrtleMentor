import React from 'react';
import { useHistory } from 'react-router-dom';

const Messages = (props) => {
  const {
    fromName, toName, body, time, fromId,
  } = props;
  const history = useHistory();
  const replyHandler = () => {
    history.push('/offerings/contact', { toId: fromId, navigatedFrom: '/profile' });
  };
  return (
    <div className="message-wrapper">
      <span className="messages-from" onClick={replyHandler}>
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
