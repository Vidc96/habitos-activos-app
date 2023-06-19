import React, { useState } from 'react';
import {useTranslation} from 'react-i18next';
import '../styles/registrationForm.css';

const RegistrationForm = () => {
  const [t, i18n] = useTranslation("global");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage(`${t("registerForm.register")}`);
        setFormData({
          name: '',
          email: '',
          password: '',
        });
      } else {
        setResponseMessage(`${t("registerForm.registerError")}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setResponseMessage(`${t("registerForm.serverError")}`);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form className='register-form' onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t("registerForm.nameForm")}
          required
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t("registerForm.emailForm")}
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
          placeholder={t("registerForm.passwordForm")}
          required
        />
      </div>
      <div>
        <input type="submit" value={t("registerForm.submitForm")} />
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default RegistrationForm;
