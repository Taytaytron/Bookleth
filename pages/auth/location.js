import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function LocationSetup() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [locationPrivacy, setLocationPrivacy] = useState('approximate');
  const [shareRadius, setShareRadius] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (!location) {
      setError('Please enter your location');
      setIsLoading(false);
      return;
    }
    
    try {
      // In a real app, we would geocode the location here
      // For demo purposes, we'll just save the text
      const response = await fetch('/api/user/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location,
          locationPrivacy,
          shareRadius,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save location');
      }
      
      // Redirect to profile page after successful setup
      router.push('/profile');
    } catch (error) {
      console.error('Error saving location:', error);
      setError('Failed to save location. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="location-page">
      <Navigation />
      
      <div className="location-container">
        <div className="location-card">
          <h1>Set Your Location</h1>
          <p className="location-subtitle">Help us connect you with readers nearby</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="location-form">
            <div className="form-section">
              <h2>Your Location</h2>
              <p className="section-description">Enter your city or neighborhood</p>
              
              <div className="form-group">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Brooklyn, NY or Williamsburg"
                  className="location-input"
                />
              </div>
            </div>
            
            <div className="form-section">
              <h2>Location Privacy</h2>
              <p className="section-description">Choose how you want to share your location</p>
              
              <div className="privacy-options">
                <label 
                  className={`privacy-option ${locationPrivacy === 'exact' ? 'selected' : ''}`}
                >
                  <input 
                    type="radio" 
                    name="locationPrivacy"
                    value="exact"
                    checked={locationPrivacy === 'exact'}
                    onChange={() => setLocationPrivacy('exact')}
                  />
                  <div className="option-content">
                    <h3>Exact Location</h3>
                    <p>Show your precise location to nearby readers</p>
                  </div>
                </label>
                
                <label 
                  className={`privacy-option ${locationPrivacy === 'approximate' ? 'selected' : ''}`}
                >
                  <input 
                    type="radio" 
                    name="locationPrivacy"
                    value="approximate"
                    checked={locationPrivacy === 'approximate'}
                    onChange={() => setLocationPrivacy('approximate')}
                  />
                  <div className="option-content">
                    <h3>Approximate Location</h3>
                    <p>Show only your general area (recommended)</p>
                  </div>
                </label>
                
                <label 
                  className={`privacy-option ${locationPrivacy === 'hidden' ? 'selected' : ''}`}
                >
                  <input 
                    type="radio" 
                    name="locationPrivacy"
                    value="hidden"
                    checked={locationPrivacy === 'hidden'}
                    onChange={() => setLocationPrivacy('hidden')}
                  />
                  <div className="option-content">
                    <h3>Hidden Location</h3>
                    <p>Don't show your location to other users</p>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="form-section">
              <h2>Book Sharing Radius</h2>
              <p className="section-description">How far are you willing to travel to share books?</p>
              
              <div className="radius-slider">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={shareRadius}
                  onChange={(e) => setShareRadius(parseInt(e.target.value))}
                  className="slider"
                />
                <div className="radius-value">{shareRadius} km</div>
              </div>
              
              <div className="radius-labels">
                <span>Nearby</span>
                <span>City-wide</span>
                <span>Regional</span>
              </div>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading || !location}
              >
                {isLoading ? 'Saving...' : 'Complete Setup'}
              </button>
              
              <Link href="/profile">
                <a className="skip-link">Skip for now</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        .location-container {
          display: flex;
          justify-content: center;
          padding: 2rem 1rem;
          background-color: var(--secondary-color);
          min-height: calc(100vh - 80px);
        }
        
        .location-card {
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 2rem;
          width: 100%;
          max-width: 600px;
        }
        
        h1 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
          text-align: center;
        }
        
        .location-subtitle {
          text-align: center;
          color: var(--light-text);
          margin-bottom: 2rem;
        }
        
        .error-message {
          background-color: #ffebee;
          color: #c62828;
          padding: 0.75rem;
          border-radius: var(--border-radius);
          margin-bottom: 1rem;
          text-align: center;
        }
        
        .location-form {
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
        
        .location-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          font-family: inherit;
          font-size: 1rem;
        }
        
        .privacy-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .privacy-option {
          display: flex;
          align-items: flex-start;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .privacy-option.selected {
          border-color: var(--primary-color);
          background-color: rgba(106, 76, 147, 0.05);
        }
        
        .privacy-option input {
          margin-top: 0.25rem;
          margin-right: 1rem;
        }
        
        .option-content h3 {
          margin: 0 0 0.25rem;
          font-size: 1.1rem;
        }
        
        .option-content p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--light-text);
        }
        
        .radius-slider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }
        
        .slider {
          flex: 1;
          -webkit-appearance: none;
          height: 8px;
          border-radius: 4px;
          background: #ddd;
          outline: none;
        }
        
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary-color);
          cursor: pointer;
        }
        
        .radius-value {
          font-weight: 600;
          color: var(--primary-color);
          width: 60px;
          text-align: right;
        }
        
        .radius-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--light-text);
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
      `}</style>
    </div>
  );
}
