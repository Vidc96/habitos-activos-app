import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import '../styles/loginForm.css';

const LoginForm = () => {
  const [t, i18n] = useTranslation("global");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('userId', data.id);
        setFormData({
          email: '',
          password: '',
        });
        setResponseMessage('');

        
        const userTypeResponse = await fetch(`http://localhost:8000/api/users/${data.id}`);
        const userTypeData = await userTypeResponse.json();
      
        if (userTypeResponse.ok) {
          const userType = userTypeData === 'admin' ? 'admin' : 'user';
          navigate(userType === 'admin' ? '/adminpage' : '/welcome');
        } else {
          console.error('Error al obtener el tipo de usuario:', userTypeData.message);
        }
      } else {
        setResponseMessage(data.message || `${t("loginForm.loginError")}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setResponseMessage(`${t("loginForm.serverError")}`);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form className='login-form' onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("loginForm.emailForm")}
          required
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder={t("loginForm.passwordForm")}
          required
        />
      </div>
      <div>
        <input type="submit" value={t("loginForm.submitForm")} />
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default LoginForm;
