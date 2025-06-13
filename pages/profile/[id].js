import React from 'react';
import { useRouter } from 'next/router';
import Navigation from '../../components/Navigation';
import BookCard from '../../components/BookCard';
import Link from 'next/link';
import { users, getBooksByUser, getUsersWithCommonBooks } from '../../data/mockData';

export default function UserProfile() {
  const router = useRouter();
  const { id } = router.query;
  const userId = parseInt(id);
  
  // Handle case when the page is pre-rendering and id is not available yet
  if (!id) {
    return <div>Loading...</div>;
  }
  
  const user = users.find(u => u.id === userId);
  
  // Handle case when user is not found
  if (!user) {
    return (
      <div className="not-found">
        <Navigation />
        <div className="container">
          <h1>User not found</h1>
          <p>Sorry, we couldn't find the user you're looking for.</p>
          <Link href="/">
            <a className="btn btn-primary">Go back home</a>
          </Link>
        </div>
      </div>
    );
  }
  
  const { favoriteBooks, readingNow, wishlist, shareableBooks } = getBooksByUser(userId);
  const connections = getUsersWithCommonBooks(userId, 2);
  
  return (
    <div className="profile-page">
      <Navigation activePage="profile" />
      
      <div className="profile-header">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              <img src={user.avatar} alt={user.name} />
            </div>
            <div className="profile-details">
              <h1>{user.name}</h1>
              <p className="location">{user.location}</p>
              <div className="reading-vibes">
                {user.readingVibe.map((vibe, index) => (
                  <span key={index} className="vibe-tag">{vibe}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="profile-content">
          <div className="profile-main">
            <div className="bio-section">
              <h2>About</h2>
              <p>{user.bio}</p>
            </div>
            
            <div className="books-section">
              <h2>Favorite Books</h2>
              <div className="book-grid">
                {favoriteBooks.map(book => (
                  <Link href={`/book/${book.id}`} key={book.id}>
                    <a>
                      <BookCard book={book} />
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="books-section">
              <h2>Currently Reading</h2>
              <div className="book-grid">
                {readingNow.map(book => (
                  <Link href={`/book/${book.id}`} key={book.id}>
                    <a>
                      <BookCard book={book} />
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            
            {shareableBooks.length > 0 && (
              <div className="books-section">
                <h2>Books Available to Share</h2>
                <div className="book-grid">
                  {shareableBooks.map(book => (
                    <Link href={`/book/${book.id}`} key={book.id}>
                      <a>
                        <BookCard book={book} />
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="profile-sidebar">
            <div className="sidebar-section">
              <h3>Connect</h3>
              <button className="btn btn-primary btn-full">Send Message</button>
            </div>
            
            <div className="sidebar-section">
              <h3>Reading Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-value">{favoriteBooks.length}</span>
                  <span className="stat-label">Favorite Books</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{readingNow.length}</span>
                  <span className="stat-label">Currently Reading</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{shareableBooks.length}</span>
                  <span className="stat-label">Books to Share</span>
                </div>
              </div>
            </div>
            
            <div className="sidebar-section">
              <h3>Similar Readers</h3>
              <div className="similar-readers">
                {connections.slice(0, 3).map(({ user: similarUser }) => (
                  <Link href={`/profile/${similarUser.id}`} key={similarUser.id}>
                    <a className="similar-reader">
                      <div className="reader-avatar">
                        <img src={similarUser.avatar} alt={similarUser.name} />
                      </div>
                      <div className="reader-info">
                        <h4>{similarUser.name}</h4>
                        <p>{similarUser.readingVibe[0]}</p>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .profile-header {
          background-color: var(--primary-color);
          color: white;
          padding: 3rem 0;
          margin-bottom: 2rem;
        }
        
        .profile-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        
        .profile-avatar {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          margin-bottom: 1.5rem;
          border: 4px solid white;
        }
        
        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .profile-details h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        
        .location {
          margin-bottom: 1rem;
          opacity: 0.9;
        }
        
        .reading-vibes {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
        }
        
        .vibe-tag {
          background-color: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
        }
        
        .profile-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .profile-main {
          flex: 1;
        }
        
        .profile-sidebar {
          flex: 0 0 100%;
        }
        
        .bio-section, .books-section, .sidebar-section {
          margin-bottom: 2.5rem;
        }
        
        .bio-section h2, .books-section h2, .sidebar-section h3 {
          color: var(--primary-color);
          margin-bottom: 1rem;
        }
        
        .book-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1.5rem;
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
        
        .btn-full {
          width: 100%;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          text-align: center;
        }
        
        .stat-item {
          background-color: var(--secondary-color);
          padding: 1rem;
          border-radius: var(--border-radius);
        }
        
        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }
        
        .stat-label {
          font-size: 0.8rem;
        }
        
        .similar-readers {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .similar-reader {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border-radius: var(--border-radius);
          transition: background-color 0.3s ease;
        }
        
        .similar-reader:hover {
          background-color: var(--secondary-color);
        }
        
        .reader-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .reader-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .reader-info h4 {
          margin-bottom: 0.25rem;
        }
        
        .reader-info p {
          font-size: 0.85rem;
          color: var(--light-text);
        }
        
        @media (min-width: 768px) {
          .profile-info {
            flex-direction: row;
            text-align: left;
            gap: 2rem;
          }
          
          .profile-avatar {
            margin-bottom: 0;
          }
          
          .reading-vibes {
            justify-content: flex-start;
          }
          
          .profile-content {
            flex-direction: row;
          }
          
          .profile-main {
            flex: 1;
          }
          
          .profile-sidebar {
            flex: 0 0 300px;
          }
        }
      `}</style>
    </div>
  );
}
