import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Messages from './Messages.jsx';

export default function Profile() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/api/messages')
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <h1>Profile page</h1>
      <div className="messages-wrapper">
        {messages.map((element) => (
          <Messages
            key={element.id}
            from={element.from_id}
            to={element.to_id}
            body={element.body}
            time={element.time}
          />
        ))}
      </div>
    </div>
  );
}
