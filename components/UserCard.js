import React from 'react';

export default function UserCard({ user, showCompatibility = false, compatibility = 0, commonBooks = [], onConnect, onMessage }) {
  const { id, name, avatar, location, readingVibe, bio } = user;
  
  return (
    <div className="user-card">
      <div className="user-avatar">
        <img 
          src={avatar || "/images/placeholder-avatar.jpg"} 
          alt={`${name}'s profile`}
          loading="lazy"
        />
        <div className="online-status"></div>
      </div>
      
      <div className="user-info">
        <h3 className="user-name" title={name}>{name}</h3>
        {location && (
          <p className="user-location" title={location}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {location}
          </p>
        )}
        
        {bio && (
          <p className="user-bio" title={bio}>{bio}</p>
        )}
        
        {readingVibe && readingVibe.length > 0 && (
          <div className="reading-vibes">
            {readingVibe.slice(0, 3).map((vibe, index) => (
              <span key={index} className="vibe-tag" title={vibe}>
                {vibe}
              </span>
            ))}
            {readingVibe.length > 3 && (
              <span className="vibe-tag more">+{readingVibe.length - 3}</span>
            )}
          </div>
        )}
        
        {showCompatibility && (
          <div className="compatibility-section">
            <div className="compatibility-bar">
              <div 
                className="compatibility-fill" 
                style={{ width: `${compatibility}%` }}
                aria-label={`${compatibility}% compatible`}
              ></div>
            </div>
            <div className="compatibility-text">{compatibility}% Uyumlu</div>
          </div>
        )}
        
        {commonBooks && commonBooks.length > 0 && (
          <div className="common-books">
            <span className="common-count">{commonBooks.length} ortak kitap</span>
            <div className="book-thumbnails">
              {commonBooks.slice(0, 3).map(book => (
                <div key={book.id} className="book-thumbnail" title={book.title}>
                  <img src={book.coverImage} alt={book.title} loading="lazy" />
                </div>
              ))}
              {commonBooks.length > 3 && (
                <div className="book-thumbnail more" title={`${commonBooks.length - 3} more books`}>
                  <span>+{commonBooks.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="user-actions">
          {onConnect && (
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onConnect(id)}
              aria-label={`Connect with ${name}`}
            >
              Bağlan
            </button>
          )}
          {onMessage && (
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onMessage(id)}
              aria-label={`Send message to ${name}`}
            >
              Mesaj
            </button>
          )}
        </div>
      </div>
      
      <style jsx>{`
        .user-card {
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 1.5rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .user-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .user-avatar {
          position: relative;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 1rem;
          border: 3px solid var(--secondary-color);
        }
        
        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .online-status {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 16px;
          height: 16px;
          background-color: #28a745;
          border: 2px solid white;
          border-radius: 50%;
        }
        
        .user-info {
          text-align: center;
        }
        
        .user-name {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: var(--text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .user-location {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          font-size: 0.85rem;
          color: var(--light-text);
          margin-bottom: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .user-bio {
          font-size: 0.9rem;
          color: var(--light-text);
          margin-bottom: 1rem;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        .reading-vibes {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.25rem;
          margin-bottom: 1rem;
        }
        
        .vibe-tag {
          background-color: var(--secondary-color);
          color: var(--primary-color);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 80px;
        }
        
        .vibe-tag.more {
          background-color: var(--primary-color);
          color: white;
        }
        
        .compatibility-section {
          margin-bottom: 1rem;
        }
        
        .compatibility-bar {
          width: 100%;
          height: 6px;
          background-color: var(--secondary-color);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.25rem;
        }
        
        .compatibility-fill {
          height: 100%;
          background: linear-gradient(90deg, #ffc107 0%, #28a745 50%, #007bff 100%);
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .compatibility-text {
          font-size: 0.8rem;
          color: var(--light-text);
          font-weight: 500;
        }
        
        .common-books {
          margin-bottom: 1rem;
        }
        
        .common-count {
          font-size: 0.8rem;
          color: var(--light-text);
          display: block;
          margin-bottom: 0.5rem;
        }
        
        .book-thumbnails {
          display: flex;
          justify-content: center;
          gap: 0.25rem;
        }
        
        .book-thumbnail {
          width: 30px;
          height: 40px;
          border-radius: 3px;
          overflow: hidden;
          background-color: var(--secondary-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .book-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .book-thumbnail.more {
          background-color: var(--primary-color);
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
        }
        
        .user-actions {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }
        
        .btn {
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 0.85rem;
          min-height: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-primary {
          background-color: var(--primary-color);
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #5a3d7a;
        }
        
        .btn-secondary {
          background-color: transparent;
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
        }
        
        .btn-secondary:hover {
          background-color: var(--primary-color);
          color: white;
        }
        
        .btn-sm {
          padding: 0.4rem 0.8rem;
          font-size: 0.8rem;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .user-card {
            padding: 1rem;
          }
          
          .user-avatar {
            width: 60px;
            height: 60px;
          }
          
          .user-name {
            font-size: 1rem;
          }
          
          .user-location, .user-bio {
            font-size: 0.8rem;
          }
          
          .vibe-tag {
            font-size: 0.7rem;
            padding: 0.2rem 0.4rem;
            max-width: 70px;
          }
          
          .user-actions {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .user-card:hover {
            transform: none;
            box-shadow: var(--box-shadow);
          }
          
          .user-card:active {
            transform: scale(0.98);
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          .user-card {
            border: 2px solid var(--text-color);
          }
          
          .user-name {
            font-weight: 700;
          }
          
          .vibe-tag {
            border: 1px solid var(--primary-color);
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .user-card {
            transition: none;
          }
          
          .compatibility-fill {
            transition: none;
          }
          
          .user-card:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}

