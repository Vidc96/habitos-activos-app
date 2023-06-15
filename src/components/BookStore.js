import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import AdminTools from './AdminTools';
import BooksIndex from './BooksIndex';
import BackMain from './BackMain';
import '../styles/bookStore.css'

const BookStore = () => {
  const [userTypeData, setUserTypeData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        const userTypeResponse = await fetch(`http://localhost:8000/api/users/${userId}`);
        const userTypeData = await userTypeResponse.json();
        setUserTypeData(userTypeData);
      }
    };

    fetchData();
  }, []);

  if (userTypeData === 'user') {
    return (
      <main>
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="content">
          <BooksIndex />
        </div>
      </main>

    );
  } else if (userTypeData === 'admin') {
    return (
      <main>
        <div className="sideBar">
          <AdminTools />
        </div>
        <div className="content">
          <BooksIndex />
        </div>
      </main>

    );
  } else {
    return (
      <main>
        <nav className="sideBar">
          <BackMain />
        </nav>
        <div className="content">
          <BooksIndex />
        </div>
      </main>
    );
  }
};

export default BookStore;
