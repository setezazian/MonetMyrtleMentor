import React, { useState } from 'react';
import axios from 'axios';

export default function FormLogin({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    axios.post('/api/user/login', formData)
      .then(() => {
        // POST and user creation is good, so move on to application
      })
      .catch((err) => {
        console.log('Error POSTing form data: ', err);
        // figure out the error and have user correct their form
      });

    history.push('/offerings');
  };

  return (
    <form>
      <label htmlFor="input-email">
        Email:&nbsp;
        <input id="input-email" name="email" type="text" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label htmlFor="input-password">
        Password:&nbsp;
        <input id="input-password" name="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button id="button-formsubmit" type="submit" onClick={formSubmitHandler}>Submit</button>
    </form>
  );
}
