import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';
import GoalForm from './GoalForm';

const GoalStore = () => {
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
        <div className="content">
          <GoalForm />
        </div>
      </main>
    </div>
  );
};

export default GoalStore;
