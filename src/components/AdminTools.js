import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminTools = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    navigate('/main');
  };

  const handleBooks = () => {
    navigate('/adminpage');
  };

  const handleBooksRepository = () => {
    navigate('/booksrepository');
  };

  const handleUsersRepository = () => {
    navigate('/usersrepository');
  };

  

  return (
    <div>
      <button onClick={handleBooks}>Library</button>
      <button onClick={handleBooksRepository}>Libray settings</button>
      <button onClick={handleUsersRepository}>Users list</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminTools;
