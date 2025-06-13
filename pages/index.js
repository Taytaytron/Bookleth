import React from 'react';
import Navigation from '../components/Navigation';
import BookCard from '../components/BookCard';
import Link from 'next/link';
import { books, users } from '../data/mockData';

export default function Home() {
  return (
    <div className="home-page">
      <Navigation activePage="home" />
      
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Connect Through Books, Not Looks</h1>
            <p className="subtitle">Find meaningful connections based on what you read, not how you appear</p>
            <div className="hero-buttons">
              <Link href="/explore">
                <a className="btn btn-primary">Explore Connections</a>
              </Link>
              <Link href="/auth/signin">
                <a className="btn btn-secondary">Get Started</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <section className="featured-section">
        <div className="container">
          <h2>Featured Books</h2>
          <div className="book-grid">
            {books.slice(0, 4).map(book => (
              <Link href={`/book/${book.id}`} key={book.id}>
                <a>
                  <BookCard book={book} />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <section className="how-it-works">
        <div className="container">
          <h2>How Booklet Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-icon">1</div>
              <h3>Create Your Profile</h3>
              <p>Add books that have shaped your thinking and personality</p>
            </div>
            <div className="step">
              <div className="step-icon">2</div>
              <h3>Discover Connections</h3>
              <p>Find people with similar literary tastes and interests</p>
            </div>
            <div className="step">
              <div className="step-icon">3</div>
              <h3>Share & Connect</h3>
              <p>Exchange books and ideas with your new connections</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="readers-section">
        <div className="container">
          <h2>Featured Readers</h2>
          <div className="readers-grid">
            {users.slice(0, 4).map(user => (
              <Link href={`/profile/${user.id}`} key={user.id}>
                <a className="reader-card">
                  <div className="reader-avatar">
                    <img src={user.avatar} alt={user.name} />
                  </div>
                  <h4>{user.name}</h4>
                  <p className="reading-vibes">{user.readingVibe.slice(0, 2).join(" • ")}</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>Booklet</h3>
              <p>Connect Through Books, Not Looks</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Explore</h4>
                <Link href="/explore"><a>Find Readers</a></Link>
                <Link href="/sharing"><a>Book Sharing</a></Link>
              </div>
              <div className="footer-column">
                <h4>About</h4>
                <a href="#">Our Story</a>
                <a href="#">How It Works</a>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <a href="#">Contact Us</a>
                <a href="#">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Booklet. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, var(--primary-color) 0%, #8b5fbf 100%);
          color: white;
          padding: 4rem 0;
          text-align: center;
        }
        
        .hero-content h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .subtitle {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          border: none;
          cursor: pointer;
        }
        
        .btn-primary {
          background-color: white;
          color: var(--primary-color);
        }
        
        .btn-primary:hover {
          background-color: var(--secondary-color);
          transform: translateY(-2px);
        }
        
        .btn-secondary {
          background-color: transparent;
          border: 2px solid white;
          color: white;
        }
        
        .btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
        
        section {
          padding: 4rem 0;
        }
        
        section h2 {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2rem;
          color: var(--primary-color);
          font-weight: 700;
        }
        
        .book-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 2rem;
          justify-items: center;
        }
        
        .how-it-works {
          background-color: var(--secondary-color);
        }
        
        .steps-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          text-align: center;
        }
        
        .step {
          padding: 2rem 1.5rem;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          transition: transform 0.3s ease;
        }
        
        .step:hover {
          transform: translateY(-5px);
        }
        
        .step-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--primary-color) 0%, #8b5fbf 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1rem;
        }
        
        .step h3 {
          margin-bottom: 1rem;
          color: var(--primary-color);
        }
        
        .readers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 2rem;
          justify-items: center;
        }
        
        .reader-card {
          text-align: center;
          padding: 1.5rem;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          transition: transform 0.3s ease;
          width: 100%;
          max-width: 250px;
        }
        
        .reader-card:hover {
          transform: translateY(-5px);
        }
        
        .reader-avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1rem;
          border: 3px solid var(--secondary-color);
        }
        
        .reader-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .reader-card h4 {
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }
        
        .reading-vibes {
          color: var(--light-text);
          font-size: 0.9rem;
        }
        
        .footer {
          background-color: var(--primary-color);
          color: white;
          padding: 3rem 0 1rem;
        }
        
        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: 2rem;
        }
        
        .footer-logo {
          flex: 0 0 100%;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .footer-logo h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        
        .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          width: 100%;
          justify-content: center;
        }
        
        .footer-column {
          flex: 1;
          min-width: 150px;
          text-align: center;
        }
        
        .footer-column h4 {
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        .footer-column a {
          display: block;
          margin-bottom: 0.5rem;
          opacity: 0.8;
          transition: opacity 0.3s ease;
          text-decoration: none;
          color: inherit;
        }
        
        .footer-column a:hover {
          opacity: 1;
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.9rem;
          opacity: 0.7;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2rem;
          }
          
          .subtitle {
            font-size: 1rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 300px;
          }
          
          .book-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 1rem;
          }
          
          .steps-container {
            grid-template-columns: 1fr;
          }
          
          .readers-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 1rem;
          }
          
          .footer-logo {
            text-align: center;
          }
          
          .footer-links {
            justify-content: center;
            text-align: center;
          }
          
          .footer-column {
            text-align: center;
          }
        }
        
        @media (min-width: 768px) {
          .footer-logo {
            flex: 0 0 30%;
            text-align: left;
          }
          
          .footer-links {
            width: 65%;
            justify-content: flex-start;
          }
          
          .footer-column {
            text-align: left;
          }
        }
      `}</style>
    </div>
  );
}

