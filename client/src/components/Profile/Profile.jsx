import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Messages from './Messages.jsx';
import Schedule from './Schedule.jsx';
import pageIdxContext, { loginContext, loginProfileContext } from '../../context.jsx';
import { useHistory } from 'react-router-dom';

export default function Profile() {
  const [messages, setMessages] = useState([]);
  const { setPageIdx } = useContext(pageIdxContext);
  const { loginIdx, setLoginIdx } = useContext(loginProfileContext);
  const { setLogin } = useContext(loginContext);
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    axios.get('/api/logout')
      .then(() => {
        setLogin(false);
        setLoginIdx(-1);
        setPageIdx(0);
        history.push('/');
      });
  };

  useEffect(() => {
    axios.post('/api/getMessages', { loginIdx })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

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
        <button className="logout-btn" onClick={logout}>Log out</button>
      </div>
      <Schedule profileId={loginIdx} />
      {conditionalReturn()}
    </div>
  );
}
