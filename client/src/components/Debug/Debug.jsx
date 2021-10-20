import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Debug() {
  const [user, setUser] = useState({});
  const [loginMsg, setLoginMsg] = useState(null);

  useEffect(() => {
    axios.get('/api/me')
      .then((response) => {
        console.log('Server responded with: ', response.data);
        if (response.data === null) {
          setLoginMsg('You are not logged in.');
        } else {
          setUser(response.data);
        }
      })
      .catch((err) => console.log('GET error: ', err));
  }, []);

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
      <p>{loginMsg}</p>
    </>
  );
}
