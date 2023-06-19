import React, { useEffect, useState } from 'react';
import '../styles/goalsContainer.css';
import { useTranslation } from 'react-i18next';

const GoalsContainer = () => {
  const [goals, setGoals] = useState([]);
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [t, i18n] = useTranslation("global");

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
    const confirmation = window.confirm(`${t("goalsContainer.alertHabit")}`);

    if (confirmation) {
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
    <div className='scroll-habits'>
      <div className='goals-grid'>
        {goals.length === 0 ? (
          <p>{t("goalsContainer.info")}</p>
        ) : (
          goals.map((goal) => (
            <div className='goal-container' key={goal.id}>
              <h4>{goal.goal_name}</h4>
              <p>{goal.goal_description}</p>
              <p>{t("goalsContainer.goalDays")}: {goal.days_completed}</p>
              <p>{t("goalsContainer.currentDay")}: {goal.current_date}</p>
              <div className='goals-buttons'>
                <button className='checkButton' type="button" onClick={() => handleButtonClick(goal.id)}>
                  {t("goalsContainer.checkHabit")}
                </button>
                <button className='deleteButton' type="button" onClick={() => handleDeleteClick(goal.id)}>
                  {t("goalsContainer.deleteHabit")}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    
  );
};

export default GoalsContainer;
