import React, { useState } from 'react';
import axios from 'axios';

const ContactModal = () => {
  const [message, setMessage] = useState('');
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
          axios.post('/api/messages', { message })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
      />
    </form>
  );
};
export default ContactModal;
