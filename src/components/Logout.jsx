import React from 'react';
import { LogoutIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuth(false);
    navigate('/login');
  };

  return (
    <button className="ml-12 flex items-center w-48 bg-huat-50 border-2 border-huat-10 hover:bg-huat-80 disabled:opacity-50 disabled:bg-huat-40 mt-4 text-huat-90 font-bold py-2 px-4 rounded-full" type="button" onClick={handleLogout}>
      <LogoutIcon className="h-5 w-5 mr-1" />
      <span className="flex-1">Log Out ?</span>
    </button>
  );
};
export default Logout;
