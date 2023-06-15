import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`http://localhost:8000/api/users/${userId}/admin`);
        const data = await response.json();

        if (response.ok) {
          setUsers(data); 
        } else {
          console.error('Error en la solicitud:', data.message);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };
    

    fetchUserList();
  }, []);
  
  return (
    <div>
      <h3>Lista de Usuarios</h3>
      <p>Cantidad de Usuarios Registrados: {users.length}</p>
      {users ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>{user.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default UserList;
