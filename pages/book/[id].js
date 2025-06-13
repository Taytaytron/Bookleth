import React from 'react';
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation';
import BookCard from '../../components/BookCard';
import Link from 'next/link';
import { books, users, getUsersByBook } from '../../data/mockData';

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const bookId = parseInt(id);
  
  // Handle case when the page is pre-rendering and id is not available yet
  if (!id) {
    return <div>Loading...</div>;
  }
  
  const book = books.find(b => b.id === bookId);
  
  // Handle case when book is not found
  if (!book) {
    return (
      <div className="not-found">
        <Navigation />
        <div className="container">
          <h1>Book not found</h1>
          <p>Sorry, we couldn't find the book you're looking for.</p>
          <Link href="/">
            <a className="btn btn-primary">Go back home</a>
          </Link>
        </div>
      </div>
    );
  }
  
  const readers = getUsersByBook(bookId);
  
  return (
    <div className="book-detail-page">
      <Navigation />
      
      <div className="container">
        <div className="book-detail">
          <div className="book-cover">
            <img src={book.coverImage} alt={book.title} />
          </div>
          
          <div className="book-info">
            <h1>{book.title}</h1>
            <h3>by {book.author}</h3>
            
            <div className="book-meta">
              <span className="genre">{book.genre}</span>
              <span className="year">{book.year}</span>
              <span className="pages">{book.pages} pages</span>
            </div>
            
            <div className="book-description">
              <h4>About this book</h4>
              <p>{book.description}</p>
            </div>
            
            <div className="book-quotes">
              <h4>Notable Quotes</h4>
              <ul>
                {book.quotes.map((quote, index) => (
                  <li key={index}>"{quote}"</li>
                ))}
              </ul>
            </div>
            
            {book.sharingStatus === "Available" && (
              <div className="sharing-info">
                <h4>Available for Sharing</h4>
                <p>Format: {book.sharingFormat}</p>
                <p>Condition: {book.sharingCondition}</p>
                <button className="btn btn-primary">Request to Borrow</button>
              </div>
            )}
          </div>
        </div>
        
        <div className="readers-section">
          <h2>Readers who enjoyed this book</h2>
          <div className="readers-grid">
            {readers.map(reader => (
              <Link href={`/profile/${reader.id}`} key={reader.id}>
                <a className="reader-card">
                  <div className="reader-avatar">
                    <img src={reader.avatar} alt={reader.name} />
                  </div>
                  <h4>{reader.name}</h4>
                  <p className="reading-vibes">{reader.readingVibe.slice(0, 2).join(" • ")}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="conversation-starters">
          <h2>Conversation Starters</h2>
          <div className="starters-list">
            <div className="starter-card">
              <h4>Themes & Symbolism</h4>
              <p>What do you think about the author's use of symbolism throughout the story?</p>
            </div>
            <div className="starter-card">
              <h4>Character Development</h4>
              <p>Which character's journey resonated with you the most and why?</p>
            </div>
            <div className="starter-card">
              <h4>Modern Relevance</h4>
              <p>How do the themes in this book relate to our current society?</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .book-detail {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin: 2rem 0;
        }
        
        .book-cover {
          flex: 0 0 auto;
          max-width: 300px;
          margin: 0 auto;
        }
        
        .book-cover img {
          width: 100%;
          height: auto;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
        }
        
        .book-info {
          flex: 1;
        }
        
        .book-info h1 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        
        .book-info h3 {
          color: var(--light-text);
          font-weight: 500;
          margin-bottom: 1.5rem;
        }
        
        .book-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .book-meta span {
          background-color: var(--secondary-color);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
        }
        
        .book-description, .book-quotes, .sharing-info {
          margin-bottom: 2rem;
        }
        
        .book-description h4, .book-quotes h4, .sharing-info h4 {
          color: var(--primary-color);
          margin-bottom: 0.75rem;
        }
        
        .book-quotes ul {
          list-style-type: none;
          padding: 0;
        }
        
        .book-quotes li {
          background-color: var(--secondary-color);
          padding: 1rem;
          border-radius: var(--border-radius);
          margin-bottom: 1rem;
          font-style: italic;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .btn-primary {
          background-color: var(--primary-color);
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #5a3d7a;
        }
        
        .readers-section, .conversation-starters {
          margin: 3rem 0;
        }
        
        .readers-section h2, .conversation-starters h2 {
          color: var(--primary-color);
          margin-bottom: 1.5rem;
        }
        
        .readers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        
        .reader-card {
          text-align: center;
          padding: 1.5rem;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          transition: transform 0.3s ease;
        }
        
        .reader-card:hover {
          transform: translateY(-5px);
        }
        
        .reader-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1rem;
        }
        
        .reader-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .reading-vibes {
          color: var(--light-text);
          font-size: 0.9rem;
        }
        
        .starters-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .starter-card {
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 1.5rem;
        }
        
        .starter-card h4 {
          color: var(--primary-color);
          margin-bottom: 0.75rem;
        }
        
        @media (min-width: 768px) {
          .book-detail {
            flex-direction: row;
          }
          
          .book-cover {
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
