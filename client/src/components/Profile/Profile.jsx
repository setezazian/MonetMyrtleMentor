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
  }, []);
  console.log(messages);
  return (
    <div>
      <div className="enrollmentTitle">Personal Profile
      </div>
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
            photo={element.photo}
          />
        ))}
      </div>
    </div>
  );
}
