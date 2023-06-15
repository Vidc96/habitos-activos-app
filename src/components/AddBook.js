import React, { useState } from 'react';

const AddBook = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [bookData, setBookData] = useState(null);
    const [responseMessage, setResponseMessage] = useState('');

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
                setResponseMessage('No se encontraron resultados');
                setBookData(null);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setResponseMessage('Error en la solicitud');
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
                setResponseMessage('¡Libro añadido con éxito!');
                setBookData(null);
            } else {
                setResponseMessage('Error al añadir el libro');
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
            <h2>Buscar un libro</h2>
            <form onSubmit={handleSearch}>
                <div>
                    <label htmlFor="searchQuery">Buscar libro:</label>
                    <input
                        type="text"
                        id="searchQuery"
                        value={searchQuery}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Buscar</button>
                </div>
            </form>

            {bookData && (
                <form onSubmit={handleAddBook}>
                    <div>
                        <label htmlFor="bookTitle">Título:</label>
                        <input type="text" id="bookTitle" value={bookData.bookTitle} readOnly />
                    </div>
                    <div>
                        <label htmlFor="authors">Autores:</label>
                        <input type="text" id="authors" value={bookData.authors} readOnly />
                    </div>
                    <div>
                        <label htmlFor="bookDescription">Descripción:</label>
                        <textarea id="bookDescription" value={bookData.bookDescription} readOnly />
                    </div>
                    <div>
                        <label htmlFor="link">Enlace:</label>
                        <input type="text" id="link" value={bookData.link} readOnly />
                    </div>
                    <div>
                        <label htmlFor="imageUrl">URL de imagen:</label>
                        <input type="text" id="imageUrl" value={bookData.imageUrl} readOnly />
                    </div>
                    <div>
                        <input type="submit" value="Añadir libro" />
                    </div>
                </form>
            )}

            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
};

export default AddBook;
