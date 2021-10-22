import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Messages from './Messages.jsx';
import Schedule from './Schedule.jsx';
import { loginProfileContext } from '../../context.jsx';

export default function Profile() {
  const [messages, setMessages] = useState([]);
  const { loginIdx } = useContext(loginProfileContext);

  useEffect(() => {
    axios.post('/api/getMessages', { loginIdx })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error(err));
  }, [loginIdx]);

  const conditionalReturn = () => {
    if (messages.length > 0) {
      return (
        <div className="messages-wrapper">
          {messages.map((element) => (
            <Messages
              key={element.id}
              fromName={element.fromname}
              toName={element.toname}
              body={element.body}
              time={element.time}
              fromId={element.from_id}
              photo={element.photo}
            />
          ))}
        </div>
      );
    }
    return (
      <div className="messages-wrapper">
        You have no messages. Contact a mentor to learn something new.
        Expand your knowledge, expand your network.
      </div>

    );
  };

  return (
    <div>
      <div className="enrollmentTitle">
        Personal Profile
      </div>
      <Schedule profileId={loginIdx} />
      {conditionalReturn()}
    </div>
  );
}
