import axios from 'axios';
import React, { useEffect } from 'react';
import { BACKEND_URL } from '../store.jsx';
import Logout from './Logout.jsx';

const Profile = ({ setAuth }) => {
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setAuth(false);
      return;
    }
    (async () => {
      try {
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        const resp = await axios.get(`${BACKEND_URL}/user/authenticate`, headers);
        const { valid } = resp.data;
        if (!valid) {
          setAuth(false);
          return;
        }
        setAuth(true);
      } catch (err) {
        setAuth(false);
        console.error(err.response);
      }
    })();
  });

  return (
    <div className="flex flex-col items-center">
      <Logout setAuth={setAuth} />
    </div>
  );
};
export default Profile;
