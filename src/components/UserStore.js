import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import UserData from './UserData'

const UserStore = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
      navigate('/main');
    }
  }, [navigate]);

  return (
    <div>
      <main>
        <div className="sidebar">
          <SideBar />
        </div>
        <div className="content">
          <UserData />
        </div>
      </main>
    </div>
  );
};

export default UserStore;
