import React, { useEffect, useState } from 'react';
import '../styles/userData.css';

const UserData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`http://localhost:8000/api/users/${userId}/user`);
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const userId = sessionStorage.getItem('userId');
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setResponseMessage('Usuario actualizado correctamente');
        window.location.reload(); 
      } else {
        setResponseMessage('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleDelete = async () => {
    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar tu cuenta?');

    if (confirmation) {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setResponseMessage('Cuenta eliminada correctamente');
          sessionStorage.removeItem('userId'); 
          window.location.reload(); 
        } else {
          setResponseMessage('Error al eliminar la cuenta');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        
      }
    }
  };

  return (
    <div className='form-content'>
      <h2>Centro de Cuenta</h2>
      <p>Administra tu experiencia</p>
      <form className='update-form' onSubmit={handleUpdate}>
        <div>
         
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder='Cambiar tu nombre'
            required
          />
        </div>
        <div>
          
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder='Cambiar tu correo'
            required
          />
        </div>
        <div>
         
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder='Cambiar tu contraseña'
          />
        </div>
        <div>
          <input type="submit" value="Actualizar" />
        </div>
      </form>
      <button className='delete-button' onClick={handleDelete}>Eliminar cuenta</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UserData;
