import React, { useState } from 'react';

const GoalForm = () => {
  const [formData, setFormData] = useState({
    goal_name: '',
    goal_description: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

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
          setResponseMessage('Error al crear el objetivo 1');
          return;
        }
      }

      if (response.ok) {
        setResponseMessage(data.message);
        setFormData({
          goal_name: '',
          goal_description: '',
        });
      } else {
        setResponseMessage('Error al crear el objetivo 2');
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
    <div>
      <h3>New Goal, let's go!</h3>
      <p>Rellena los campos a continuación:</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="goal_name"
            name="goal_name"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="goal_description">Descripción:</label>
          <input
            type="text"
            id="goal_description"
            name="goal_description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input type="submit" value="Crear objetivo" />
        </div>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default GoalForm;
