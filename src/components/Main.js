import React from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import {useTranslation} from 'react-i18next';
import '../styles/main.css'

const Main = () => {
  const [t, i18n] = useTranslation("global");
  
  return (
    <main className='main-container'>
      <div className='container'>
        <div className="text">
          <h1>"{t("main.title")}"</h1>
          <span>- James Clear </span>
        </div>
      </div>
      <div className='container'>
        <div className="form-container">
          <RegistrationForm />
        </div>
        <div className="form-container">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default Main;
