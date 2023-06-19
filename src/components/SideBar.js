import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/navButtons.css';
import { useTranslation } from 'react-i18next';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [t, i18n] = useTranslation("global");

  const handleWelcome = () => {
    navigate('/welcome');
  };
  
  const handleGoalStore = () => {
    navigate('/goalstore');
  };
  
  const handleUserStore = () => {
    navigate('/userstore');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    navigate('/');
  };
  
  return (
    <div className='nav'>
      <button className='navButton' onClick={handleWelcome}>{t("sideBar.myHabits")}</button>
      <button className='navButton' onClick={handleGoalStore}>{t("sideBar.newHabit")}</button>
      <button className='navButton' onClick={handleUserStore}>{t("sideBar.settings")}</button>
      <button className='navButton' onClick={handleLogout}>{t("sideBar.logout")}</button>
    </div>
  );
};

export default SideBar;
