import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Messages from './Messages.jsx';
import Schedule from './Schedule.jsx';
import { loginProfileContext } from '../../context.jsx';

export default function Profile() {
  const [messages, setMessages] = useState([]);
  const { loginIdx, setLoginIdx } = useContext(loginProfileContext);

  useEffect(() => {
    axios.get('/api/messages')
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log(messages);
  return (
    <div>
      <h1>Profile page</h1>
      <Schedule profileId={1} />
      <div className="messages-wrapper">
        {messages.map((element) => (
          <Messages
            key={element.id}
            fromName={element.fromname}
            toName={element.toname}
            body={element.body}
            time={element.time}
            fromId={element.from_id}
          />
        ))}
      </div>
    </div>
  );
}
