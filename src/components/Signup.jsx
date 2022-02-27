import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../store.jsx';

const Signup = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (message) setMessage('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const data = {
      name: username,
      email,
      password,
    };

    try {
      const resp = await axios.post(`${BACKEND_URL}/user/signup`, data);
      const { token } = resp.data;
      if (token) {
        localStorage.setItem('authToken', token);
        setAuth(true);
        navigate('/');
      }
    } catch (err) {
      setAuth(false);
      if (err.response.status === 401) {
        setMessage('Email exists!');
      }
      console.log(err.response);
    }
  };

  return (
    <div className="max-w-md w-full m-auto bg-indigo-100 rounded p-5">
      <form onSubmit={handleSignup}>
        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="name">
            Name
            <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" name="name" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
        </div>

        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="email">
            Email
            <input className="w-full p-2 mb-2 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="email" name="email" value={email} onChange={handleEmailChange} required />
          </label>
          <p className="text-sm text-red-500 font-bold mb-4">{message}</p>
        </div>

        <div>
          <label className="block mb-2 text-indigo-500" htmlFor="password">
            Password
            <input className="w-full p-2 mb-4 text-indigo-700 border-b-2 border-indigo-500 outline-none focus:bg-gray-300" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
        </div>
        <input className="w-full bg-indigo-700 hover:bg-pink-700 text-white font-bold py-2 px-4 mb-4 rounded" type="submit" value="Sign Up" />
      </form>

      <footer className="text-center">
        <span className="text-sm">
          Already have an account?
          <Link to="/login" className="text-indigo-700 hover:text-pink-700"> Log in!</Link>
        </span>
      </footer>
    </div>
  );
};

export default Signup;
