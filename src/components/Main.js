import React from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import '../styles/main.css'

const Main = () => {
  return (
    <main className='main-container'>
      <div className='container'>
        <div className="text">
          <h1>"Tus hábitos son soluciones modernas a deseos ancestrales"</h1>
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
