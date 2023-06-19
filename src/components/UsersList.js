import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [t, i18n] = useTranslation("global");

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
    <div className='table-user'>
      <h1>{t("userList.titles")}</h1>
      <p>{t("userList.usersCount")} {users.length}</p>
      {users ? (
        <table>
          <thead>
            <tr>
              <th>{t("userList.name")}</th>
              <th>{t("userList.email")}</th>
              <th className='useerData'>{t("userList.dateCreate")}</th>
              <th className='useerData'>{t("userList.dateUpdate")}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className='useerData'>{user.created_at}</td>
                <td className='useerData'>{user.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{t("userList.notFound")}</p>
      )}
    </div>
  );
};

export default UserList;
