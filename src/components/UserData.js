import React, { useEffect, useState } from 'react';

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
      setResponseMessage('Error en la solicitud');
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
          sessionStorage.removeItem('userId'); // Elimina el ID del usuario de la sessionStorage
          window.location.reload(); // Recarga la página después de eliminar la cuenta
        } else {
          setResponseMessage('Error al eliminar la cuenta');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        setResponseMessage('Error en la solicitud');
      }
    }
  };

  return (
    <div>
      <h3>Centro de Cuenta</h3>
      <p>Administra tu experiencia</p>
      <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="Actualizar" />
        </div>
      </form>
      <button onClick={handleDelete}>Eliminar cuenta</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UserData;
