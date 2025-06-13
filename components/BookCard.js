import React from 'react';

export default function BookCard({ book, size = 'normal', showStatus = false }) {
  const { title, author, coverImage, sharingStatus, condition, genre } = book;
  
  return (
    <div className={`book-card ${size}`}>
      <div className="book-cover">
        <img 
          src={coverImage || "/images/placeholder-book.jpg"} 
          alt={`${title} by ${author}`}
          loading="lazy"
        />
        {showStatus && sharingStatus && (
          <div className={`status-badge ${sharingStatus.toLowerCase().replace(' ', '-')}`}>
            {sharingStatus}
          </div>
        )}
        {condition && showStatus && (
          <div className="condition-badge">
            {condition === 'new' ? 'Yeni' : 
             condition === 'good' ? 'İyi' : 
             condition === 'fair' ? 'Orta' : 'Eski'}
          </div>
        )}
      </div>
      <div className="book-info">
        <h4 className="book-title" title={title}>{title}</h4>
        <p className="book-author" title={author}>{author}</p>
        {genre && (
          <span className="book-genre">{genre}</span>
        )}
      </div>
      
      <style jsx>{`
        .book-card {
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
          border-radius: var(--border-radius);
          overflow: hidden;
          background-color: white;
        }
        
        .book-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .book-card.normal {
          width: 100%;
          max-width: 180px;
        }
        
        .book-card.small {
          width: 100%;
          max-width: 120px;
        }
        
        .book-card.large {
          width: 100%;
          max-width: 220px;
        }
        
        .book-cover {
          position: relative;
          height: 260px;
          background-color: var(--secondary-color);
          overflow: hidden;
          flex-shrink: 0;
        }
        
        .book-card.small .book-cover {
          height: 180px;
        }
        
        .book-card.large .book-cover {
          height: 320px;
        }
        
        .book-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .book-card:hover .book-cover img {
          transform: scale(1.05);
        }
        
        .status-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-transform: uppercase;
        }
        
        .status-badge.available {
          background-color: #28a745;
        }
        
        .status-badge.borrowed {
          background-color: #ffc107;
          color: #333;
        }
        
        .status-badge.not-available {
          background-color: #dc3545;
        }
        
        .condition-badge {
          position: absolute;
          bottom: 8px;
          left: 8px;
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.7rem;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
        }
        
        .book-info {
          padding: 0.75rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        
        .book-title {
          font-weight: 600;
          margin-bottom: 0.25rem;
          font-size: 1rem;
          line-height: 1.3;
          color: var(--text-color);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        .book-card.small .book-title {
          font-size: 0.9rem;
          -webkit-line-clamp: 2;
        }
        
        .book-card.large .book-title {
          font-size: 1.1rem;
        }
        
        .book-author {
          color: var(--light-text);
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .book-card.small .book-author {
          font-size: 0.8rem;
        }
        
        .book-genre {
          font-size: 0.75rem;
          color: var(--primary-color);
          background-color: var(--secondary-color);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          align-self: flex-start;
          margin-top: auto;
        }
        
        /* Mobile optimizations */
        @media (max-width: 768px) {
          .book-card {
            width: 100%;
            max-width: none;
          }
          
          .book-cover {
            height: 200px;
          }
          
          .book-card.small .book-cover {
            height: 140px;
          }
          
          .book-card.large .book-cover {
            height: 240px;
          }
          
          .book-info {
            padding: 0.5rem;
          }
          
          .book-title {
            font-size: 0.9rem;
          }
          
          .book-author {
            font-size: 0.8rem;
          }
          
          .status-badge, .condition-badge {
            font-size: 0.7rem;
            padding: 0.2rem 0.4rem;
          }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .book-card:hover {
            transform: none;
            box-shadow: var(--box-shadow);
          }
          
          .book-card:active {
            transform: scale(0.98);
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          .book-card {
            border: 2px solid var(--text-color);
          }
          
          .book-title {
            font-weight: 700;
          }
        }
        
        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .book-card {
            transition: none;
          }
          
          .book-cover img {
            transition: none;
          }
          
          .book-card:hover {
            transform: none;
          }
          
          .book-card:hover .book-cover img {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}

