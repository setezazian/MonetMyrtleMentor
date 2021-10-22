import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ContactModal = (props) => {
  const { location } = props;
  const [message, setMessage] = useState('');
  const [fromUser, setFromUser] = useState(null);
  const history = useHistory();

  const { toId, navigatedFrom } = location.state;
  useEffect(() => {
    axios.get('/api/me')
      .then((response) => {
        console.log('Server responded with: ', response.data);
        if (response.data !== null) {
          setFromUser(response.data.profile_id);
        }
      })
      .catch((err) => console.log('GET error: ', err));
  }, []);
  return (
    <form className="contact-form">
      <textarea
        className="contact-message"
        type="text"
        placeholder="send a message to this mentor"
        rows="15"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <input
        className="contact-submit"
        type="submit"
        value="   Send Message   "
        onClick={(event) => {
          event.preventDefault();
          axios.post('/api/messages', { message, fromUser, toId })
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
          // history.push(navigatedFrom);
          const offerLeng = [];
          axios.get('/api/allOfferings')
            .then((res) => {
              res.data.forEach((element, index) => {
                offerLeng.push(index);
              });
            })
            .then(() => {
              history.push(navigatedFrom, { detail: offerLeng });
            })
            .catch((err) => console.error(err));
        }}
      />
    </form>
  );
};
export default ContactModal;
