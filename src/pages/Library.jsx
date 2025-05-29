import React, { useState } from 'react';

const languages = ['English', 'Hindi', 'Telugu', 'Spanish', 'French', 'German', 'Italian', 'Arabic'];
const genres = ['Science', 'History', 'Love', 'Fantasy', 'Mystery', 'Horror', 'Poetry', 'Adventure'];

const Library = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [allBooks, setAllBooks] = useState([]);
  const [books, setBooks] = useState([]);
  const [diaryVisible, setDiaryVisible] = useState(false);
  const [notes, setNotes] = useState('');
  const [myBooks, setMyBooks] = useState([]);
  const [voiceRate, setVoiceRate] = useState(1);

  const fetchBooks = async () => {
    if (!selectedGenre) {
      alert("Please select a genre");
      return;
    }
    try {
      const response = await fetch(`https://openlibrary.org/subjects/${selectedGenre.toLowerCase()}.json?limit=30`);
      const data = await response.json();
      const sortedBooks = (data.works || []).sort((a, b) => a.title.localeCompare(b.title));
      setAllBooks(sortedBooks);
      applyLanguageFilter(sortedBooks, selectedLanguage);
    } catch (error) {
      console.error('API fetch failed:', error);
    }
  };

  const applyLanguageFilter = (books, language) => {
    if (!language) {
      setBooks(books);
    } else {
      const filtered = books.filter(book =>
        book.language && book.language.some(langCode => langCode.toLowerCase().includes(language.toLowerCase()))
      );
      setBooks(filtered.length ? filtered : books); // fallback if no match
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    applyLanguageFilter(allBooks, lang);
  };

  const handleSaveNote = () => {
    if (!notes.trim()) return;
    alert('Note saved!');
    setNotes('');
  };

  const handlePublishBook = () => {
    if (!notes.trim()) return;
    const newBook = { title: `Diary Note ${myBooks.length + 1}`, content: notes };
    setMyBooks([...myBooks, newBook]);
    alert('Diary converted to a book!');
    setNotes('');
  };

  return (
    <div className="library-container">
      <style>{`
        .library-container {
          text-align: center;
          padding: 20px;
          background-color: #f7f7f7;
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }

        .title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
        }

        .selectors select, .fetch-btn, .save-btn, .convert-btn {
          padding: 10px 15px;
          margin: 10px;
          font-size: 1rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          background-color: white;
          color: #333;
          cursor: pointer;
          font-weight: 500;
        }

        .booklist-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-top: 30px;
          justify-items: center;
        }

        .book-card {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 15px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 220px;
          min-height: 360px;
        }

        .book-cover {
          width: 120px;
          height: 160px;
          object-fit: cover;
          border-radius: 5px;
        }

        .book-info {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }

        .book-card strong {
          margin-top: 10px;
          font-size: 1rem;
          color: #000;
        }

        .book-card span {
          font-size: 0.9rem;
          margin-top: 5px;
          text-align: center;
          color: #555;
        }

        .open-book-btn {
          margin-top: 10px;
          padding: 8px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          width: 100%;
          font-weight: bold;
          text-decoration: none;
        }

        .open-book-btn:hover {
          background: #0056b3;
        }

        .diary-section {
          position: fixed;
          top: 20px;
          right: 20px;
        }

        .diary-toggle {
          font-size: 24px;
          background: #007bff;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 50%;
          cursor: pointer;
        }

        .diary-box {
          margin-top: 10px;
          background: white;
          padding: 15px;
          border-radius: 10px;
          width: 280px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        textarea {
          width: 100%;
          min-height: 80px;
          padding: 10px;
          font-size: 1rem;
          resize: none;
          border: 1px solid #ccc;
          border-radius: 5px;
          margin-bottom: 10px;
        }

        .slider {
          margin-top: 10px;
          text-align: left;
        }

        @media (max-width: 600px) {
          .booklist-container {
            grid-template-columns: 1fr;
          }

          .diary-section {
            position: static;
            margin-top: 2rem;
          }

          .diary-box {
            width: 100%;
            max-width: 100%;
          }
        }
      `}</style>

      <h1 className="title">📚 Lifebox Library</h1>

      <div className="selectors">
        <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
          <option value="">Select Language</option>
          {languages.map((lang, idx) => <option key={idx} value={lang}>{lang}</option>)}
        </select>

        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="">Select Genre</option>
          {genres.map((genre, idx) => <option key={idx} value={genre}>{genre}</option>)}
        </select>

        <button className="fetch-btn" onClick={fetchBooks}>Fetch Books</button>
      </div>

      <div className="booklist-container">
        {(books.length > 0 ? books : myBooks).map((book, index) => (
          <div key={index} className="book-card">
            {book.cover_id && (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                alt={book.title}
                className="book-cover"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            <div className="book-info">
              <strong>{book.title}</strong>
              <span>{book.authors?.map(author => author.name).join(', ') || book.content}</span>
            </div>
            {book.key && (
              <a
                href={`https://openlibrary.org${book.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="open-book-btn"
              >
                Open Book
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="diary-section">
        <button className="diary-toggle" onClick={() => setDiaryVisible(!diaryVisible)}>✏️</button>
        {diaryVisible && (
          <div className="diary-box">
            <textarea
              placeholder="Write your main points or notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button onClick={handleSaveNote} className="save-btn">Save Note</button>
            <button onClick={handlePublishBook} className="convert-btn">Convert to Book</button>
            <div className="slider">
              <label>Voice Speed</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceRate}
                onChange={(e) => setVoiceRate(parseFloat(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
