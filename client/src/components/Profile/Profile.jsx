import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Messages from './Messages.jsx';
import Schedule from './Schedule.jsx';

export default function Profile() {
  const [messages, setMessages] = useState([]);

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
      <Schedule />
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
