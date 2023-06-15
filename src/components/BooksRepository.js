import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTools from './AdminTools';
import AddBook from './AddBook';
import DeleteBook from './DeleteBook';

const BooksRepository = () => {
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
          <AddBook />
          <DeleteBook />
        </div>
      </main>
    </div>
  );
};

export default BooksRepository;
