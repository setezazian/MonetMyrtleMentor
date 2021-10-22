import { useHistory } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { loginContext, loginProfileContext } from '../../context.jsx';

export default function FormLogin({ setModal }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setLogin } = useContext(loginContext);
  const { setLoginIdx } = useContext(loginProfileContext);
  const [generalMsg, setGeneralMsg] = useState(null);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    axios.post('/api/user/login', formData)
      .then((loginResponse) => {
        if (loginResponse.data !== null) {
          console.log('Successful login');
          setLogin(true);
          setLoginIdx(loginResponse.data.profile_id);
        }
        history.push('/offerings');
        setModal(null);
      })
      .catch((err) => {
        console.log('Error logging in: ', err);
        setGeneralMsg('Incorrect username or password');
      });
    setEmail('');
    setPassword('');
  };

  return (
    <div className="container-form">
      <form>
        <label htmlFor="input-email">
          Email:&nbsp;
          <input id="input-email" name="email" type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label htmlFor="input-password">
          Password:&nbsp;
          <input id="input-password" name="password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button id="button-formsubmit" type="submit" onClick={formSubmitHandler} className="login-button">Submit</button>
      </form>
      {generalMsg ? (<p>{generalMsg}</p>) : null}
    </div>
  );
}
