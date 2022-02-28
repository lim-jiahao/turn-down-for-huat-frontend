import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../store.jsx';

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (message) setMessage('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (message) setMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const resp = await axios.post(`${BACKEND_URL}/user/login`, data);
      const { token } = resp.data;
      if (token) {
        localStorage.setItem('authToken', token);
        setAuth(true);
        setMessage('');
        navigate('/');
      }
    } catch (err) {
      setAuth(false);
      setMessage('Invalid login! Please check your details and try again.');
      console.error(err.response);
    }
  };

  return (
    <div className="max-w-md w-full bg-huat-50 rounded p-5">
      <form onSubmit={handleLogin}>
        <div>
          <label className="block mb-2 text-lg text-huat-90" htmlFor="email">
            Email
            <input className="w-full p-2 mb-4 text-huat-40 border-b-4 border-huat-70 outline-none focus:bg-gray-300" type="email" name="email" value={email} onChange={handleEmailChange} required />
          </label>
        </div>

        <div>
          <label className="block mb-2 text-lg text-huat-90" htmlFor="password">
            Password
            <input className="w-full p-2 mb-4 text-huat-40 border-b-4 border-huat-70 outline-none focus:bg-gray-300" type="password" name="password" value={password} onChange={handlePasswordChange} required />
          </label>
        </div>

        <p className="text-md text-stone-900 font-bold mb-4">{message}</p>

        <div>
          <input className="w-full mx-auto mb-4 bg-huat-50 border-2 border-huat-10 hover:bg-huat-80 disabled:opacity-50 disabled:bg-huat-40 mt-4 text-huat-90 font-bold py-2 px-4 rounded-full" type="submit" value="Log In" />
        </div>
      </form>

      <footer className="mb-4">
        <Link to="/#" className="text-huat-90 hover:text-huat-40 text-sm float-left">Forgot Password?</Link>
        <Link to="/signup" className="text-huat-90 hover:text-huat-40 text-sm float-right">Create Account</Link>
      </footer>
    </div>
  );
};

export default Login;
