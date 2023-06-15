import React, { useEffect, useState } from 'react';
import '../styles/bookIndex.css';

const BooksIndex = () => {
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
    return <p>La librería está vacía.</p>;
  }

  return (
    <div className="books-grid">
      {books.map((book) => (
        <div className="book-container" key={book.id}>
          <img src={book.imageUrl} alt={book.bookTitle} />
          <h2>{book.bookTitle}</h2>
          <p>Autores: {book.authors}</p>
          <a href={book.link} target="_blank" rel="noopener noreferrer">
            Ver más
          </a>
        </div>
      ))}
    </div>
  );
};

export default BooksIndex;
