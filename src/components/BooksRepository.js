import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTools from './AdminTools';
import AddBook from './AddBook';
import DeleteBook from './DeleteBook';
import ListBooks from './ListBooks';

const BooksRepository = () => {
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
          <AdminTools />
        </div>
        <div className='content-bookSetting'>
          <div className="content">
            <AddBook />
          </div>
          <div className="content-listbooks">
            <DeleteBook />
            <ListBooks />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BooksRepository;
