import React, { useEffect, useState } from 'react';
import '../styles/goalsContainer.css';

const GoalsContainer = () => {
  const [goals, setGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`http://localhost:8000/api/goals/${userId}`);
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchGoals();
  }, [isRefreshing]);

  const handleGoalCheck = async (goalId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/goals/${goalId}/check`, {
        method: 'POST',
      });

      if (response.ok) {

        setIsRefreshing(!isRefreshing);
      } else {
        console.error('Error al marcar el objetivo como completado');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleGoalDelete = async (goalId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/goals/${goalId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsRefreshing(!isRefreshing);
      } else {
        console.error('Error al eliminar el objetivo');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  const handleButtonClick = async (goalId) => {
    setSelectedGoalId(goalId);
    await handleGoalCheck(goalId);
  };

  const handleDeleteClick = async (goalId) => {
    setSelectedGoalId(goalId);
    await handleGoalDelete(goalId);
  };

  return (
    <div className='goals-grid'>
      {goals.length === 0 ? (
        <p>No tienes ningún hábito activo aún.</p>
      ) : (
        goals.map((goal) => (
          <div className='goal-container' key={goal.id}>
            <h4>{goal.goal_name}</h4>
            <p>{goal.goal_description}</p>
            <p>Días completados: {goal.days_completed}</p>
            <p>Fecha actual: {goal.current_date}</p>
            <div className='goals-buttons'>
              <button className='checkButton' type="button" onClick={() => handleButtonClick(goal.id)}>
                Listo
              </button>
              <button className='deleteButton' type="button" onClick={() => handleDeleteClick(goal.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GoalsContainer;
