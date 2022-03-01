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
    <div className="max-w-md w-full bg-huat-50 rounded p-5">
      <form onSubmit={handleSignup}>
        <div>
          <label className="block mb-2 text-lg text-huat-90" htmlFor="name">
            Name
            <input className="w-full p-2 mb-4 text-huat-40 border-b-4 border-huat-70 outline-none focus:bg-gray-300" name="name" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
        </div>

        <div>
          <label className="block mb-2 text-lg text-huat-90" htmlFor="email">
            Email
            <input className="w-full p-2 mb-2 text-huat-40 border-b-4 border-huat-70 outline-none focus:bg-gray-300" type="email" name="email" value={email} onChange={handleEmailChange} required />
          </label>
          <p className="text-sm text-huat-10 font-bold mb-4">{message}</p>
        </div>

        <div>
          <label className="block mb-2 text-lg text-huat-90" htmlFor="password">
            Password
            <input className="w-full p-2 mb-4 text-huat-40 border-b-4 border-huat-70 outline-none focus:bg-gray-300" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
        </div>
        <input className="w-full mx-auto mb-4 bg-huat-50 border-2 border-huat-10 hover:bg-huat-80 disabled:opacity-50 disabled:bg-huat-40 mt-4 text-huat-90 font-bold py-2 px-4 rounded-full" type="submit" value="Sign Up" />
      </form>

      <footer className="text-center">
        <span className="text-sm">
          Already have an account?
          <Link to="/login" className="text-huat-90 hover:text-huat-40 text-sm"> Log in!</Link>
        </span>
      </footer>
    </div>
  );
};

export default Signup;
