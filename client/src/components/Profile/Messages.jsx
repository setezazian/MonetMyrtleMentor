import React from 'react';
import { useHistory } from 'react-router-dom';

const Messages = (props) => {
  const {
    fromName, toName, body, time, fromId, photo,
  } = props;
  const messageDate = new Date(time).toLocaleString('default', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
  });
  const history = useHistory();
  const replyHandler = () => {
    history.push('/offerings/contact', { toId: fromId, navigatedFrom: '/profile' });
  };
  return (
    <div className="message-wrapper">
      <span className="messages-from" onClick={replyHandler}>
        <img src={photo} alt="From" />
        {/* From: {fromName} */}
      </span>
      <span className="messages-to">
        To: {toName}
      </span>
      <span className="messages-message">
        {body}
      </span>
      <span className="messages-time">
        {messageDate}
      </span>
    </div>
  );
};
export default Messages;
