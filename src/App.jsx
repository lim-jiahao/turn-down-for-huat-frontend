import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route, NavLink,
} from 'react-router-dom';
import axios from 'axios';
import LandingPage from './components/LandingPage.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';

axios.defaults.withCredentials = true;
const BACKEND_URL = 'http://localhost:3004';

const App = () => {
  const [auth, setAuth] = useState(false);

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
    <div className="w-screen flex flex-col items-center">
      <Router>
        <div className="w-full mb-6">
          <nav className="flex justify-evenly text-sky-500">
            <NavLink className={({ isActive }) => `${isActive && 'font-bold'} hover:underline`} to="/">Home</NavLink>
            {auth ? (
              <NavLink className={({ isActive }) => `${isActive && 'font-bold'} hover:underline`} to="/profile">Profile</NavLink>
            ) : (
              <NavLink className={({ isActive }) => `${isActive && 'font-bold'} hover:underline`} to="/login">Log In</NavLink>
            )}
          </nav>
        </div>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="profile" element={auth ? <Profile setAuth={setAuth} /> : <LandingPage />} />
          <Route path="login" element={<Login setAuth={setAuth} />} />
          <Route path="signup" element={<Signup setAuth={setAuth} />} />
        </Routes>
      </Router>
    </div>
  ); };

export default App;
