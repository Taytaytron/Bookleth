import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { withAuth } from '../../utils/auth';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

function SettingsProfile({ session }) {
  const router = useRouter();
  const [name, setName] = useState(session.user.name || '');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(session.user.image || '/images/placeholder-avatar.jpg');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // In a real app, we would upload the image and update the profile
      // For demo purposes, we'll just simulate a successful update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess('Profile updated successfully!');
      setIsLoading(false);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="settings-page">
      <Navigation />
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <h2>Settings</h2>
          <nav className="settings-nav">
            <Link href="/settings/profile">
              <a className="settings-nav-item active">Profile</a>
            </Link>
            <Link href="/settings/preferences">
              <a className="settings-nav-item">Reading Preferences</a>
            </Link>
            <Link href="/settings/location">
              <a className="settings-nav-item">Location</a>
            </Link>
            <Link href="/settings/account">
              <a className="settings-nav-item">Account</a>
            </Link>
            <Link href="/settings/privacy">
              <a className="settings-nav-item">Privacy</a>
            </Link>
            <Link href="/settings/notifications">
              <a className="settings-nav-item">Notifications</a>
            </Link>
          </nav>
        </div>
        
        <div className="settings-content">
          <h1>Edit Profile</h1>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit} className="settings-form">
            <div className="profile-image-section">
              <div className="profile-image-container">
                <img src={previewImage} alt="Profile" className="profile-image-preview" />
                <label htmlFor="profile-image" className="profile-image-upload">
                  <span>Change Photo</span>
                </label>
                <input 
                  type="file" 
                  id="profile-image" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="profile-image-input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="name">Display Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your display name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell others about yourself and your reading interests..."
                rows={5}
              />
              <p className="input-help">Max 200 characters</p>
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        .settings-container {
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
          gap: 2rem;
        }
        
        .settings-sidebar {
          flex: 0 0 100%;
        }
        
        .settings-sidebar h2 {
          color: var(--primary-color);
          margin-bottom: 1rem;
        }
        
        .settings-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .settings-nav-item {
          padding: 0.75rem;
          border-radius: var(--border-radius);
          transition: all 0.3s ease;
        }
        
        .settings-nav-item:hover {
          background-color: var(--secondary-color);
        }
        
        .settings-nav-item.active {
          background-color: var(--primary-color);
          color: white;
        }
        
        .settings-content {
          flex: 1;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 2rem;
        }
        
        h1 {
          color: var(--primary-color);
          margin-bottom: 1.5rem;
        }
        
        .error-message {
          background-color: #ffebee;
          color: #c62828;
          padding: 0.75rem;
          border-radius: var(--border-radius);
          margin-bottom: 1rem;
        }
        
        .success-message {
          background-color: #e8f5e9;
          color: #2e7d32;
          padding: 0.75rem;
          border-radius: var(--border-radius);
          margin-bottom: 1rem;
        }
        
        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .profile-image-section {
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }
        
        .profile-image-container {
          position: relative;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .profile-image-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .profile-image-upload {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.6);
          color: white;
          text-align: center;
          padding: 0.5rem;
          cursor: pointer;
          font-size: 0.9rem;
        }
        
        .profile-image-input {
          display: none;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        input, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          font-family: inherit;
          font-size: 1rem;
        }
        
        textarea {
          resize: vertical;
        }
        
        .input-help {
          font-size: 0.85rem;
          color: var(--light-text);
          margin-top: 0.25rem;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
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
        
        .btn-secondary {
          background-color: #f5f5f5;
          color: #333;
        }
        
        .btn-secondary:hover {
          background-color: #e0e0e0;
        }
        
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        @media (min-width: 768px) {
          .settings-container {
            flex-direction: row;
          }
          
          .settings-sidebar {
            flex: 0 0 250px;
          }
        }
      `}</style>
    </div>
  );
}

export default withAuth(SettingsProfile);
