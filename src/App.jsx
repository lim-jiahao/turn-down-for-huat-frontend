import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, NavLink,
} from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';

const App = () => (

  <div className="App w-screen flex flex-col items-center">
    <Router>
      <div className="w-full mb-6">
        <nav className="flex justify-evenly text-sky-500">
          <NavLink className={({ isActive }) => `${isActive && 'font-bold'} hover:underline`} to="/">Home</NavLink>
          <NavLink className={({ isActive }) => `${isActive && 'font-bold'} hover:underline`} to="/test">Test</NavLink>
          <NavLink className={({ isActive }) => `${isActive && 'font-bold'} hover:underline`} to="/test2">Test2</NavLink>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  </div>
);

export default App;

const Test = () => (
  <div>Test</div>
);

const Test2 = () => (
  <div>Test2</div>
);
