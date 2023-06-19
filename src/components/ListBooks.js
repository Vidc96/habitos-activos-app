import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ListBooks = () => {
  const [t, i18n] = useTranslation("global");
  const [bookNames, setBookNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/books');
        const data = await response.json();

        if (response.ok) {
          const names = data.map((book) => book.bookTitle);
          setBookNames(names);
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
    return <p>{t("listBooks.loadingBooks")}</p>;
  }

  if (bookNames.length === 0) {
    return <p>{t("listBooks.notFound")}</p>;
  }

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            <th>{t("listBooks.titles")}</th>
          </tr>
        </thead>
        <tbody>
          {bookNames.map((name, index) => (
            <tr key={index}>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListBooks;
