import React, { useState, useContext } from 'react';
import axios from 'axios';
import { loginContext } from '../../context.jsx';

export default function FormLogin({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, setLogin } = useContext(loginContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    axios.post('/api/user/login', formData)
      .then(() => {
        // POST and user creation is good, so move on to application
        axios.get('/api/me')
          .then((res) => {
            if (res.data !== null) {
              setLogin(true);
            }
          });
      })
      .catch((err) => {
        console.log('Error POSTing form data: ', err);
        // figure out the error and have user correct their form
      });

    history.push('/offerings', { detail: [0, 1] });
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
