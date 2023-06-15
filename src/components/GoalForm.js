import React, { useState } from 'react';
import '../styles/goalForm.css';

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
        }
      }

      if (response.ok) {
        setResponseMessage(data.message);
        setFormData({
          goal_name: '',
          goal_description: '',
        });
      } 
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className='form-content'>
      <h2>¿Listo para un nuevo hábito?, empecemos ya!</h2>
      <p>Rellena los campos a continuación:</p>
      <form className='goal-form' onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="goal_name"
            name="goal_name"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título para tu hábito"
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="goal_description"
            name="goal_description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Mi hábito trata sobre..."
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
