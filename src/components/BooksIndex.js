import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/bookIndex.css';

const BooksIndex = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [t, i18n] = useTranslation("global");

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
    return <p>{t("library.loadingBooks")}</p>;
  }

  if (books.length === 0) {
    return <p>{t("library.anyBooks")}</p>;
  }

  return (
    <div className='content-library'>
      <div className="books-grid">
        {books.map((book) => (
          <div className="book-container" key={book.id}>
            <img src={book.imageUrl} alt={book.bookTitle} />
            <h2>{book.authorBook}</h2>
            <p>{t("library.authorBook")}: {book.authors}</p>
            <a href={book.link} target="_blank" rel="noreferrer">
              {t("library.link")}
            </a>
          </div>

        ))}
      </div>
    </div>
  );
};

export default BooksIndex;
