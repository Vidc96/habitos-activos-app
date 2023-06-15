import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTools from './AdminTools';
import UsersList from './UsersList';

const UsersRepository = () => {
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
          <AdminTools />
        </div>
        <div className="content">
          <UsersList />
        </div>
      </main>
    </div>
  );
};

export default UsersRepository;
