import React from 'react';

const currentDate = new Date();
const WelcomeMessage = () => {
  
  return (
    <div>
      <h2>Te damos la bienvenida!</h2>
      <p>Llena tu vida de buenos hábitos, recuerda marcar como "listo" tu hábito de hoy: {currentDate.toLocaleDateString()} </p>
    </div>
  );
};

export default WelcomeMessage;
