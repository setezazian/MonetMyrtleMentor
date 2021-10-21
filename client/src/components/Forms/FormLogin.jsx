import React, { useState, useContext } from 'react';
import axios from 'axios';
import { loginContext, loginProfileContext } from '../../context.jsx';

export default function FormLogin({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, setLogin } = useContext(loginContext);
  const { loginIdx, setLoginIdx } = useContext(loginProfileContext);

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
              setLoginIdx(res.data.profile_id);
            }
          });
      })
      .then(() => {
        const offerLeng = [];
        axios.get('/api/allOfferings')
          .then((res) => {
            res.data.forEach((element, index) => {
              offerLeng.push(index);
            });
          })
          .then(() => {
            history.push('/offerings', { detail: offerLeng });
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.log('Error POSTing form data: ', err);
        // figure out the error and have user correct their form
      });
  };

  return (
    <form>
      <label htmlFor="input-email">
        Email:&nbsp;
        <input id="input-email" name="email" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <br />
      <label htmlFor="input-password">
        Password:&nbsp;
        <input id="input-password" name="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="8" required />
      </label>
      <br />
      <button id="button-formsubmit" type="submit" onClick={formSubmitHandler}>Submit</button>
    </form>
  );
}
