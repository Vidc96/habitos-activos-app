import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const NavLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBookStore = () => {
    navigate('/bookstore');
  };

  return (
    <nav>
      <button className='nav-button' onClick={handleBookStore}>Books</button>
    </nav>
  );
};

export default NavLinks;
