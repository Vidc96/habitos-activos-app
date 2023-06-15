import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import WelcomeMessage from './WelcomeMessage';
import GoalsContainer from './GoalsContainer';
import '../styles/contentUser.css';

const WelcomePage = () => {
  const navigate = useNavigate();

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
          <WelcomeMessage />
          <h3>Tus objetivos</h3>
          <GoalsContainer />
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;
