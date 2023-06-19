import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AddBook = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [bookData, setBookData] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');
    const [t, i18n] = useTranslation("global");

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`);
            const data = await response.json();

            if (response.ok && data.items) {
                const book = data.items[0];
                const bookData = {
                    bookTitle: book.volumeInfo.title,
                    authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown',
                    bookDescription: book.volumeInfo.description || 'No description available',
                    link: book.volumeInfo.infoLink,
                    imageUrl: book.volumeInfo.imageLinks?.thumbnail || '',
                };
                setBookData(bookData);
                setResponseMessage('');
            } else {
                setResponseMessage(`${t("addBook.notFound")}`);
                setBookData(null);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setResponseMessage(`${t("addBook.serverError")}`);
        }
    };

    const handleAddBook = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            if (response.ok) {
                setResponseMessage(`${t("addBook.bookAdded")}`);
                setBookData(null);
            } else {
                setResponseMessage(`${t("addBook.bookError")}`);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setResponseMessage(`${t("addBook.serverError")}`);
        }
    };

    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div>
            <form className='add-form' onSubmit={handleSearch}>
                <h2>{t("addBook.addTitle")}</h2>
                <div>
                    <input
                        type="text"
                        id="searchQuery"
                        value={searchQuery}
                        onChange={handleChange}
                        placeholder={t("addBook.findBook")}
                        required
                    />
                    <button type="submit">{t("addBook.submit")}</button>
                </div>
            </form>

            {bookData && (
                <form className='book-form' onSubmit={handleAddBook}>

                    <label htmlFor="bookTitle">{t("addBook.titleBook")}:</label>
                    <input type="text" id="bookTitle" value={bookData.bookTitle} readOnly />


                    <label htmlFor="authors">{t("addBook.authorBook")}:</label>
                    <input type="text" id="authors" value={bookData.authors} readOnly />


                    <label htmlFor="bookDescription">{t("addBook.desciptionBook")}:</label>
                    <textarea id="bookDescription" value={bookData.bookDescription} readOnly />


                    <label htmlFor="link">{t("addBook.linkBook")}:</label>
                    <input type="text" id="link" value={bookData.link} readOnly />


                    <label htmlFor="imageUrl">{t("addBook.linkImg")}</label>
                    <input type="text" id="imageUrl" value={bookData.imageUrl} readOnly />


                    <input type="submit" value={t("addBook.submitForm")} />

                </form>
            )}

            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default AddBook;
