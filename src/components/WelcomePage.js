import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import WelcomeMessage from './WelcomeMessage';
import GoalsContainer from './GoalsContainer';
import '../styles/contentUser.css';
import { useTranslation } from 'react-i18next';
import VideoPublicity from './VideoPublicity';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <main>
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="content-user">
          <div>
            <WelcomeMessage />
            <h2>{t("welcome.title")}</h2>
            <GoalsContainer />
          </div>
          <div className="content-video">
            <VideoPublicity />
          </div>
        </div>

      </main>
    </div>
  );
};

export default WelcomePage;
