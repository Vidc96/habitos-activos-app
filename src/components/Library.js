import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


const Library = () => {
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

  const totalBooks = books.length;

  return (
    <div className="library">
      <h2 className="library-title">{t("library.welcomeLibrary")}</h2>
      <p className="total-books">{t("library.countBooks")} {totalBooks}</p>
      <table className="library-table">
        <thead>
          <tr>
            <th>{t("library.titleBook")}</th>
            <th>{t("library.authorBook")}</th>
            <th className='description'>{t("library.desciptionBook")}</th>
            <th>{t("library.linkBook")}</th>
            <th>{t("library.imageBook")}</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.bookTitle}</td>
              <td>{book.authors}</td>
              <td className='description'>{book.bookDescription}</td>
              <td>
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  {t("library.link")}
                </a>
              </td>
              <td>
                <img src={book.imageUrl} alt={book.book_title} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default Library;
