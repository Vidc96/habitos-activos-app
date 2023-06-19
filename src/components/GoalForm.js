import React, { useState } from 'react';
import '../styles/goalForm.css';
import { useTranslation } from 'react-i18next';

const GoalForm = () => {
  const [formData, setFormData] = useState({
    goal_name: '',
    goal_description: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [t, i18n] = useTranslation('global');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userId = sessionStorage.getItem('userId');
      const response = await fetch(`http://localhost:8000/api/goals/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      let data = {};

      if (text) {
        try {
          data = JSON.parse(text);
        } catch (error) {
          console.error('Error al analizar la respuesta JSON:', error);
        }
      }

      if (response.status === 201) {
        setFormData({
          goal_name: '',
          goal_description: '',
        });
        setResponseMessage(`${t('goalForm.habitCreated')}`);
      } else {
        setResponseMessage(data.message || `${t('goalForm.errorCreated')}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="content">
      <div className="form-content">
        <h2>{t('goalForm.titleCreate')}</h2>
        <p>{t('goalForm.info')}</p>
        <form className="goal-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="goal_name"
              name="goal_name"
              value={formData.goal_name}
              onChange={handleChange}
              placeholder={t('goalForm.titleHabit')}
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="goal_description"
              name="goal_description"
              value={formData.goal_description}
              onChange={handleChange}
              placeholder={t('goalForm.infoHabit')}
              required
            />
          </div>
          <div>
            <input type="submit" value={t('goalForm.inputSubmit')} />
          </div>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
      <div className="image-container">
        <h3>{t('goalForm.titlePublicity')}</h3>
        <a href="https://shop-eu.kurzgesagt.org/products/habit-journal" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn.shopify.com/s/files/1/0252/6822/4088/products/01_HabitJournal_Front_0d0aa7bd-ecd0-400a-87e1-51b78415aa8a.jpg?crop=center&v=1674232316&width=540" alt="Image" />
        </a>
      </div>
    </div>
  );
};

export default GoalForm;
