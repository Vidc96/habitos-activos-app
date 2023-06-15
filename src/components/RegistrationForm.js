import React, { useState } from 'react';
import '../styles/registrationForm.css';

const RegistrationForm = () => {
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
        setResponseMessage(data.message);
        setFormData({
          name: '',
          email: '',
          password: '',
        });
      } else {
        setResponseMessage(data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setResponseMessage('Error en la solicitud');
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
          required
          placeholder='Nombre'
        />
      </div>
      <div>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder='Correo'
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder='Contraseña'
        />
      </div>
      <div>
        <input type="submit" value="Registrarse" />
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
};

export default RegistrationForm;
