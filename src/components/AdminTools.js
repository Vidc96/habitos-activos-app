import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminTools = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [t, i18n] = useTranslation("global");

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    navigate('/');
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
      <button className='navButton' onClick={handleBooks}>{t("admindBar.books")}</button>
      <button className='navButton' onClick={handleBooksRepository}>{t("admindBar.booksSettings")}</button>
      <button className='navButton' onClick={handleUsersRepository}>{t("admindBar.users")}</button>
      <button className='navButton' onClick={handleLogout}>{t("admindBar.logout")}</button>
    </div>
  );
};

export default AdminTools;
