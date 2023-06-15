import React, { useState } from 'react';

const DeleteBook = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleDeleteBook = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/books/${searchQuery}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setResponseMessage('¡Libro eliminado con éxito!');
      } else {
        setResponseMessage('Error al eliminar el libro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setResponseMessage('Error en la solicitud');
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h2>Eliminar un libro</h2>

      <form onSubmit={handleDeleteBook}>
        <div>
          <label htmlFor="searchQuery">Buscar libro:</label>
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={handleChange}
            required
          />
          <input type="submit" value="Eliminar libro" />
        </div>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default DeleteBook;
