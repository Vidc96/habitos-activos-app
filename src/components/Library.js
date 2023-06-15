import React, { useEffect, useState } from 'react';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/books');
        const data = await response.json();

        if (response.ok) {
          setBooks(data);
        } else {
          console.log('Error:', data.message);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (isLoading) {
    return <p>Cargando libros...</p>;
  }

  if (books.length === 0) {
    return <p>No existen libros en existencia.</p>;
  }

  const totalBooks = books.length;

  return (
    <div>
      <h2>Bienvenido a la Librería</h2>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autores</th>
            <th>Descripción</th>
            <th>Enlace</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.bookTitle}</td>
              <td>{book.authors}</td>
              <td>{book.bookDescription}</td>
              <td>
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  Ver más
                </a>
              </td>
              <td>
                <img src={book.imageUrl} alt={book.book_title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total de libros disponibles: {totalBooks}</p>
    </div>
  );
};

export default Library;
