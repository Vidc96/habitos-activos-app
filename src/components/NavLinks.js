import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NavLinks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [t, i18n] = useTranslation("global");

  const handleBookStore = () => {
    navigate('/bookstore');
  };

  return (
    <nav>
      <div>
        <button className='nav-button' onClick={handleBookStore}>{t("navLinks.bookstore")}</button>
      </div>
      <div>
        <button className='nav-button' onClick={() => i18n.changeLanguage("en")}>🇬🇧</button>
        <button className='nav-button' onClick={() => i18n.changeLanguage("es")}>🇪🇸</button>
      </div>
    </nav>
  );
};

export default NavLinks;
