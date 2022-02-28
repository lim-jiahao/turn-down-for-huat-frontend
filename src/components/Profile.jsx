import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UserIcon } from '@heroicons/react/outline';
import { BACKEND_URL } from '../store.jsx';
import Logout from './Logout.jsx';
import TicketsTable from './TicketsTable.jsx';

const Profile = ({ setAuth }) => {
  const [curUser, setCurUser] = useState({});

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

  useEffect(() => {
    (async () => {
      try {
        const headers = { headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` } };

        const resp = await axios.get(`${BACKEND_URL}/user/self`, headers);
        setCurUser(resp.data);
        console.log(resp);
      } catch (err) {
        console.error(err.response);
      }
    })();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="text-black mb-3 text-center">
          <div className="mb-1">
            Logged in as
            <div className="flex items-center justify-center">
              <UserIcon className="h-5 w-5 mr-1" />
              <p className="font-bold text-lg">{curUser.user?.name}</p>
            </div>
          </div>
        </div>

        <Logout setAuth={setAuth} />
      </div>
      <TicketsTable tickets={curUser.tickets} />
    </>
  );
};
export default Profile;
