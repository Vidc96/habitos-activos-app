import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../styles/navButtons.css';

const BackMain = () => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMain= () => {
    navigate('/');
  };

  return (
      <button className='navButton' onClick={handleMain}>{t("back.backButton")}</button>
  );
};

export default BackMain;
