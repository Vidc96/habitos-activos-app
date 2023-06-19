import React, { useState } from 'react';
import '../styles/userData.css';
import { useTranslation } from 'react-i18next';

const UserData = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [t, i18n] = useTranslation("global");

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      const userId = sessionStorage.getItem('userId');
      const requestBody = {
        name: name !== '' ? name : undefined,
        email: email !== '' ? email : undefined,
        password: password !== '' && currentPassword !== '' ? password : undefined,
        current_password: currentPassword !== '' ? currentPassword : undefined,
      };
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setUpdateSuccess(true);
        setName('');
        setEmail('');
        setPassword('');
        setCurrentPassword('');
      } else {
        setUpdateSuccess(false);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(`${t("userData.alertUser")}`);

    if (confirmation) {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setUpdateSuccess(true);
          sessionStorage.removeItem('userId');
        } else {
          setUpdateSuccess(false);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
  };

  return (
    <div className='content-settings'>
      
      <div className='form-content'>
        <h2>{t("userData.title")}</h2>
        <p>{t("userData.info")}</p>
        <form className='update-form' onSubmit={handleUpdate}>
          <div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t("userData.nameEdit")}
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("userData.emailEdit")}
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t("userData.passEdit")}
            />
          </div>
          <div>
            <input
              type="password"
              id="current_password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              placeholder={t("userData.pass")}
            />
          </div>
          <div>
            <input type="submit" value={t("userData.inputSubmit")} />
          </div>
        </form>
        <button className='delete-button' onClick={handleDelete}>{t("userData.inputDelete")}</button>
        {updateSuccess && <p>{t("userData.info1")}</p>}
        {updateSuccess === false && <p>{t("userData.info2")}</p>}
      </div>

      <div className="image-setting">
        <img src="https://cdn2.iconfinder.com/data/icons/seo-3-black-fill/64/SEO_-3_-_Filled_Outline_-_10-35-512.png" alt="Image" />
      </div>

    </div>
  );
};

export default UserData;
