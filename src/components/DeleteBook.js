import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DeleteBook = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [t, i18n] = useTranslation("global");
  const handleDeleteBook = async (event) => {
    event.preventDefault();

    const confirmed = window.confirm(`${t("deleteBook.alertBook")}`);
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/books/${searchQuery}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setResponseMessage(`${t("deleteBook.bookDeleted")}`);
      } else {
        setResponseMessage(`${t("deleteBook.errorDelete")}`);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setResponseMessage(`${t("deleteBook.serverError")}`);
    }
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <form className="delete-form" onSubmit={handleDeleteBook}>
        <h2>{t("deleteBook.deleteTitle")}</h2>
        <div>
          <input
            type="text"
            id="searchQuery"
            value={searchQuery}
            onChange={handleChange}
            placeholder={t("deleteBook.nameBook")}
            required
          />
        </div>
        <div>
          <input type="submit" value={t("deleteBook.inputDelete")} />
        </div>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default DeleteBook;
