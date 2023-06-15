import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/navButtons.css';

const BackMain = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMain= () => {
    navigate('/');
  };

  return (
      <button className='navButton' onClick={handleMain}>Back</button>
  );
};

export default BackMain;
