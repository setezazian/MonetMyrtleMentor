import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Debug() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get('/api/me')
      .then((response) => {
        console.log('Server responded with: ', response.data);
        if (response.data !== null) {
          setUser(response.data);
        }
      })
      .catch((err) => console.log('GET error: ', err));
  }, []);

  const logoutHandler = () => {
    axios.get('/api/logout')
      .then((response) => {
        console.log('Logout response from server: ', response.data);
        setUser({});
      })
      .catch((err) => console.log('Error trying to logout: ', err));
  };

  return (
    <>
      <p>I see this user info:</p>
      <p>
        User ID:
        {user.id}
      </p>
      <p>
        User Profile ID:
        {user.profile_id}
      </p>
      <p>{user.id === undefined ? 'You are not logged in.' : null}</p>
      <br />
      <button id="button-logout" type="button" onClick={logoutHandler}>Logout</button>
    </>
  );
}
