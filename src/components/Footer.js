import React from 'react';
import {useTranslation} from 'react-i18next';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Hábitos Activos. {t("footer.copyRights")}</p>
      <div className="social-icons">
        <a href="https://www.instagram.com">
          <FaInstagram />
        </a>
        <a href="https://www.twitter.com">
          <FaTwitter />
        </a>
        <a href="https://www.youtube.com">
          <FaYoutube />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
