import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import BookStore from './components/BookStore';
import AdminPage from './components/AminPage';
import WelcomePage from './components/WelcomePage';
import UserStore from './components/UserStore';
import GoalStore from './components/GoalStore';
import BooksRepository from './components/BooksRepository';
import UsersRepository from './components/UsersRepository';

const App = () => {
  return (
    <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/bookstore" element={<BookStore />} />
            <Route path="/adminpage" element={<AdminPage />} />
            <Route path="/userstore" element={<UserStore />} />
            <Route path="/goalstore" element={<GoalStore />} />
            <Route path="/booksrepository" element={<BooksRepository />} />
            <Route path="/usersrepository" element={<UsersRepository />} />
          </Routes>
          <Footer />
        </div>
    </Router>
  );
};

export default App;
