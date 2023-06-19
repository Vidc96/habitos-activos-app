import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTools from './AdminTools';
import Library from './Library';

const AdminPage = () => {
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
        <div className="sideBar">
          <AdminTools />
        </div>
        <div className="content-user">
          <Library />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
