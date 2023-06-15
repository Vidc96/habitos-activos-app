import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/navButtons.css';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    navigate('/');
  };

  const handleWelcome = () => {
    navigate('/welcome');
  };
  
  const handleGoalStore = () => {
    navigate('/goalstore');
  };
  
  const handleUserStore = () => {
    navigate('/userstore');
  };
  
  return (
    <div className='nav'>
      <button className='navButton' onClick={handleWelcome}>Welcome!</button>
      <button className='navButton' onClick={handleGoalStore}>Create a goal!</button>
      <button className='navButton' onClick={handleLogout}>Logout</button>
      <button className='navButton' onClick={handleUserStore}>Settings</button>
    </div>
  );
};

export default SideBar;
