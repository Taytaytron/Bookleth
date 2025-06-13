import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function ReadingPreferences() {
  const router = useRouter();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [readingFrequency, setReadingFrequency] = useState('');
  const [readingVibe, setReadingVibe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const genres = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Science Fiction', 
    'Fantasy', 'Romance', 'Thriller', 'Biography', 
    'History', 'Self-Help', 'Poetry', 'Classics'
  ];
  
  const vibes = [
    'Deep Thinker', 'Fiction Explorer', 'Character-Driven', 
    'Plot-Focused', 'Classic Appreciator', 'Contemporary Reader',
    'Slow & Thoughtful', 'Fast-Paced', 'Visual Reader'
  ];
  
  const handleGenreToggle = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  
  const handleVibeToggle = (vibe) => {
    if (readingVibe.includes(vibe)) {
      setReadingVibe(readingVibe.filter(v => v !== vibe));
    } else {
      setReadingVibe([...readingVibe, vibe]);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/user/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          genres: selectedGenres,
          readingFrequency,
          readingVibe,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }
      
      // Redirect to location setup
      router.push('/auth/location');
    } catch (error) {
      console.error('Error saving preferences:', error);
      setIsLoading(false);
    }
  };
  
  return (
    <div className="preferences-page">
      <Navigation />
      
      <div className="preferences-container">
        <div className="preferences-card">
          <h1>Your Reading Preferences</h1>
          <p className="preferences-subtitle">Help us personalize your Booklet experience</p>
          
          <form onSubmit={handleSubmit} className="preferences-form">
            <div className="form-section">
              <h2>Favorite Genres</h2>
              <p className="section-description">Select genres you enjoy reading (choose at least 3)</p>
              
              <div className="genres-grid">
                {genres.map(genre => (
                  <label 
                    key={genre} 
                    className={`genre-checkbox ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                  >
                    <input 
                      type="checkbox" 
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleGenreToggle(genre)}
                    />
                    <span>{genre}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-section">
              <h2>Reading Frequency</h2>
              <p className="section-description">How often do you typically read?</p>
              
              <div className="frequency-options">
                {['Daily', 'Few times a week', 'Weekly', 'Monthly', 'Occasionally'].map(frequency => (
                  <label 
                    key={frequency} 
                    className={`frequency-radio ${readingFrequency === frequency ? 'selected' : ''}`}
                  >
                    <input 
                      type="radio" 
                      name="readingFrequency"
                      value={frequency}
                      checked={readingFrequency === frequency}
                      onChange={() => setReadingFrequency(frequency)}
                    />
                    <span>{frequency}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-section">
              <h2>Your Reading Vibe</h2>
              <p className="section-description">Select reading styles that describe you (choose up to 3)</p>
              
              <div className="vibes-grid">
                {vibes.map(vibe => (
                  <label 
                    key={vibe} 
                    className={`vibe-checkbox ${readingVibe.includes(vibe) ? 'selected' : ''}`}
                  >
                    <input 
                      type="checkbox" 
                      checked={readingVibe.includes(vibe)}
                      onChange={() => handleVibeToggle(vibe)}
                      disabled={readingVibe.length >= 3 && !readingVibe.includes(vibe)}
                    />
                    <span>{vibe}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading || selectedGenres.length < 3 || !readingFrequency || readingVibe.length === 0}
              >
                {isLoading ? 'Saving...' : 'Continue'}
              </button>
              
              <Link href="/profile">
                <a className="skip-link">Skip for now</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        .preferences-container {
          display: flex;
          justify-content: center;
          padding: 2rem 1rem;
          background-color: var(--secondary-color);
          min-height: calc(100vh - 80px);
        }
        
        .preferences-card {
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 2rem;
          width: 100%;
          max-width: 800px;
        }
        
        h1 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
          text-align: center;
        }
        
        .preferences-subtitle {
          text-align: center;
          color: var(--light-text);
          margin-bottom: 2rem;
        }
        
        .preferences-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .form-section {
          margin-bottom: 1rem;
        }
        
        h2 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }
        
        .section-description {
          color: var(--light-text);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }
        
        .genres-grid, .vibes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
        }
        
        .genre-checkbox, .vibe-checkbox {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .genre-checkbox.selected, .vibe-checkbox.selected {
          background-color: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
        
        .genre-checkbox input, .vibe-checkbox input {
          position: absolute;
          opacity: 0;
        }
        
        .frequency-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .frequency-radio {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .frequency-radio.selected {
          background-color: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
        
        .frequency-radio input {
          position: absolute;
          opacity: 0;
        }
        
        .form-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .btn {
          padding: 0.75rem 2rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }
        
        .btn-primary {
          background-color: var(--primary-color);
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #5a3d7a;
        }
        
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .skip-link {
          color: var(--light-text);
          font-size: 0.9rem;
        }
        
        @media (max-width: 600px) {
          .genres-grid, .vibes-grid {
            grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
