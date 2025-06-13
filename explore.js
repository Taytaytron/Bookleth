import React, { useState, useEffect } from 'react';
import { withAuth } from '../utils/auth';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import { getUsersWithCompatibility, getBooksByLocation } from '../data/mockData';

function ExplorePage({ session }) {
  const [activeTab, setActiveTab] = useState('readers');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [distance, setDistance] = useState(10);
  const [readingFrequency, setReadingFrequency] = useState('');
  const [readingVibes, setReadingVibes] = useState([]);
  const [mapView, setMapView] = useState(false);
  const [connections, setConnections] = useState([]);
  const [nearbyBooks, setNearbyBooks] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  
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
  
  useEffect(() => {
    // Fetch mock data
    setConnections(getUsersWithCompatibility(1, 20));
    setNearbyBooks(getBooksByLocation(1, 10));
    
    // Mock friend requests
    setFriendRequests([
      {
        id: 101,
        name: 'Mehmet A.',
        avatar: '/images/placeholder-avatar.jpg',
        commonBooks: 3,
        readingVibes: ['Deep Thinker', 'Classic Appreciator']
      },
      {
        id: 102,
        name: 'Ayşe B.',
        avatar: '/images/placeholder-avatar.jpg',
        commonBooks: 2,
        readingVibes: ['Fiction Explorer', 'Character-Driven']
      }
    ]);
    
    // Mock friends
    setFriends([
      {
        id: 201,
        name: 'Zeynep K.',
        avatar: '/images/placeholder-avatar.jpg',
        lastActive: '2 saat önce',
        commonBooks: 5
      },
      {
        id: 202,
        name: 'Ali M.',
        avatar: '/images/placeholder-avatar.jpg',
        lastActive: '1 gün önce',
        commonBooks: 4
      },
      {
        id: 203,
        name: 'Deniz Y.',
        avatar: '/images/placeholder-avatar.jpg',
        lastActive: 'Şu anda aktif',
        commonBooks: 7
      }
    ]);
  }, []);
  
  const handleGenreToggle = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  
  const handleVibeToggle = (vibe) => {
    if (readingVibes.includes(vibe)) {
      setReadingVibes(readingVibes.filter(v => v !== vibe));
    } else {
      setReadingVibes([...readingVibes, vibe]);
    }
  };
  
  const handleFriendRequest = (action, userId) => {
    // In a real app, we would send this to the server
    if (action === 'accept') {
      const acceptedUser = friendRequests.find(req => req.id === userId);
      setFriends([...friends, {
        ...acceptedUser,
        lastActive: 'Yeni eklendi'
      }]);
    }
    
    // Remove from requests
    setFriendRequests(friendRequests.filter(req => req.id !== userId));
  };
  
  return (
    <div className="explore-page">
      <Navigation activePage="explore" />
      
      <div className="explore-header">
        <div className="container">
          <h1>Kitaplar Aracılığıyla Bağlan</h1>
          <p className="subtitle">Okuma zevklerinize göre yeni arkadaşlar keşfedin</p>
        </div>
      </div>
      
      <div className="container">
        <div className="explore-tabs">
          <button 
            className={`tab-button ${activeTab === 'readers' ? 'active' : ''}`}
            onClick={() => setActiveTab('readers')}
          >
            Okuyucular
          </button>
          <button 
            className={`tab-button ${activeTab === 'books' ? 'active' : ''}`}
            onClick={() => setActiveTab('books')}
          >
            Yakındaki Kitaplar
          </button>
          <button 
            className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            Arkadaşlık İstekleri
            {friendRequests.length > 0 && (
              <span className="badge">{friendRequests.length}</span>
            )}
          </button>
          <button 
            className={`tab-button ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            Arkadaşlarım
          </button>
        </div>
        
        {activeTab === 'readers' && (
          <div className="explore-content">
            <div className="filters-container">
              <h2>Okuyucu Filtrele</h2>
              
              <div className="filters">
                <div className="filter-section">
                  <h3>Kitap Türleri</h3>
                  <div className="genre-filters">
                    {genres.map(genre => (
                      <label 
                        key={genre} 
                        className={`filter-chip ${selectedGenres.includes(genre) ? 'selected' : ''}`}
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
                
                <div className="filter-section">
                  <h3>Konum Mesafesi</h3>
                  <div className="distance-filter">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={distance}
                      onChange={(e) => setDistance(parseInt(e.target.value))}
                      className="slider"
                    />
                    <div className="distance-value">{distance} km</div>
                  </div>
                </div>
                
                <div className="filter-section">
                  <h3>Okuma Sıklığı</h3>
                  <div className="frequency-filters">
                    {['Daily', 'Few times a week', 'Weekly', 'Monthly', 'Occasionally'].map(frequency => (
                      <label 
                        key={frequency} 
                        className={`filter-chip ${readingFrequency === frequency ? 'selected' : ''}`}
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
                
                <div className="filter-section">
                  <h3>Okuma Vibeleri</h3>
                  <div className="vibe-filters">
                    {vibes.map(vibe => (
                      <label 
                        key={vibe} 
                        className={`filter-chip ${readingVibes.includes(vibe) ? 'selected' : ''}`}
                      >
                        <input 
                          type="checkbox" 
                          checked={readingVibes.includes(vibe)}
                          onChange={() => handleVibeToggle(vibe)}
                        />
                        <span>{vibe}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="results-container">
              <div className="results-header">
                <h2>Eşleşen Okuyucular</h2>
                <p className="results-count">{connections.length} okuyucu bulundu</p>
              </div>
              
              <div className="reader-results">
                {connections.map(({ user, commonBooks, compatibility }) => (
                  <div key={user.id} className="reader-card">
                    <div className="reader-avatar">
                      <img src={user.avatar} alt={user.name} />
                    </div>
                    <div className="reader-info">
                      <h3>{user.name}</h3>
                      <p className="reader-location">{user.location}</p>
                      <div className="reader-vibes">
                        {user.readingVibe.slice(0, 2).map((vibe, index) => (
                          <span key={index} className="vibe-tag">{vibe}</span>
                        ))}
                      </div>
                      <div className="compatibility">
                        <div className="compatibility-bar">
                          <div className="compatibility-fill" style={{ width: `${compatibility}%` }}></div>
                        </div>
                        <div className="compatibility-text">{compatibility}% Uyumlu</div>
                      </div>
                      <div className="common-books">
                        <span className="common-count">{commonBooks.length} ortak kitap</span>
                        <div className="book-thumbnails">
                          {commonBooks.slice(0, 3).map(book => (
                            <div key={book.id} className="book-thumbnail">
                              <img src={book.coverImage} alt={book.title} />
                            </div>
                          ))}
                          {commonBooks.length > 3 && (
                            <div className="book-thumbnail more">
                              <span>+{commonBooks.length - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="reader-actions">
                        <Link href={`/profile/${user.id}`}>
                          <a className="btn btn-secondary btn-sm">Profili Görüntüle</a>
                        </Link>
                        <button className="btn btn-primary btn-sm">Bağlantı Kur</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'books' && (
          <div className="explore-content">
            <div className="view-toggle">
              <button 
                className={`toggle-button ${!mapView ? 'active' : ''}`}
                onClick={() => setMapView(false)}
              >
                Liste Görünümü
              </button>
              <button 
                className={`toggle-button ${mapView ? 'active' : ''}`}
                onClick={() => setMapView(true)}
              >
                Harita Görünümü
              </button>
            </div>
            
            {mapView ? (
              <div className="map-container">
                <div className="map-placeholder">
                  <p>Harita görünümü burada olacak</p>
                  <p>Bu demo sürümünde harita entegrasyonu bulunmamaktadır.</p>
                </div>
              </div>
            ) : (
              <div className="nearby-books">
                <h2>Yakınınızdaki Kitaplar</h2>
                
                <div className="book-results">
                  {nearbyBooks.map(book => (
                    <div key={book.id} className="nearby-book-card">
                      <div className="book-cover">
                        <img src={book.coverImage} alt={book.title} />
                      </div>
                      <div className="book-info">
                        <h3>{book.title}</h3>
                        <p className="author">{book.author}</p>
                        <div className="book-owner">
                          <div className="owner-avatar">
                            <img src="/images/placeholder-avatar.jpg" alt="Book Owner" />
                          </div>
                          <div className="owner-info">
                            <span className="owner-name">Ahmet Y.</span>
                            <span className="distance">2.3 km uzaklıkta</span>
                          </div>
                        </div>
                        <div className="sharing-details">
                          <span className="detail">
                            <strong>Durum:</strong> {
                              book.condition === 'new' ? 'Yeni gibi' : 
                              book.condition === 'good' ? 'İyi durumda' : 'Çok okunmuş'
                            }
                          </span>
                          <span className="detail">
                            <strong>Süre:</strong> {
                              book.duration === '1_week' ? '1 hafta' : 
                              book.duration === '2_weeks' ? '2 hafta' : 
                              book.duration === '1_month' ? '1 ay' : 'Belirsiz'
                            }
                          </span>
                          <span className="detail">
                            <strong>Teslim:</strong> {
                              book.deliveryMethod === 'in_person' ? 'Yüz yüze' : 
                              book.deliveryMethod === 'booklet_courier' ? 'Booklet kurye' : 'Kargo'
                            }
                          </span>
                        </div>
                        <div className="book-actions">
                          <Link href={`/book/${book.id}`}>
                            <a className="btn btn-secondary btn-sm">Detaylar</a>
                          </Link>
                          <button className="btn btn-primary btn-sm">İstek Gönder</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'requests' && (
          <div className="explore-content">
            <h2>Arkadaşlık İstekleri</h2>
            
            {friendRequests.length > 0 ? (
              <div className="friend-requests">
                {friendRequests.map(request => (
                  <div key={request.id} className="request-card">
                    <div className="request-avatar">
                      <img src={request.avatar} alt={request.name} />
                    </div>
                    <div className="request-info">
                      <h3>{request.name}</h3>
                      <p className="common-books">{request.commonBooks} ortak kitap</p>
                      <div className="request-vibes">
                        {request.readingVibes.map((vibe, index) => (
                          <span key={index} className="vibe-tag">{vibe}</span>
                        ))}
                      </div>
                      <div className="request-actions">
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={() => handleFriendRequest('accept', request.id)}
                        >
                          Kabul Et
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleFriendRequest('reject', request.id)}
                        >
                          Reddet
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Şu anda bekleyen arkadaşlık isteğiniz bulunmuyor.</p>
                <Link href="/explore?tab=readers">
                  <a className="btn btn-secondary">Okuyucuları Keşfet</a>
                </Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'friends' && (
          <div className="explore-content">
            <h2>Arkadaşlarım</h2>
            
            {friends.length > 0 ? (
              <div className="friends-list">
                {friends.map(friend => (
                  <div key={friend.id} className="friend-card">
                    <div className="friend-avatar">
                      <img src={friend.avatar} alt={friend.name} />
                      <div className={`status-indicator ${friend.lastActive === 'Şu anda aktif' ? 'online' : ''}`}></div>
                    </div>
                    <div className="friend-info">
                      <h3>{friend.name}</h3>
                      <p className="last-active">{friend.lastActive}</p>
                      <p className="common-books">{friend.commonBooks} ortak kitap</p>
                      <div className="friend-actions">
                        <button className="btn btn-primary btn-sm">Mesaj Gönder</button>
                        <button className="btn btn-secondary btn-sm">Kitap Öner</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Henüz arkadaşınız bulunmuyor.</p>
                <Link href="/explore?tab=readers">
                  <a className="btn btn-secondary">Okuyucuları Keşfet</a>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .explore-header {
          background-color: var(--primary-color);
          color: white;
          padding: 3rem 0;
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        
        .subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        
        .explore-tabs {
          display: flex;
          overflow-x: auto;
          margin-bottom: 2rem;
          border-bottom: 1px solid #ddd;
        }
        
        .tab-button {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          color: var(--light-text);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .tab-button:after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 3px;
          background-color: var(--primary-color);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        
        .tab-button.active {
          color: var(--primary-color);
        }
        
        .tab-button.active:after {
          transform: scaleX(1);
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: var(--primary-color);
          color: white;
          font-size: 0.75rem;
          margin-left: 0.5rem;
        }
        
        .explore-content {
          margin-bottom: 3rem;
        }
        
        .filters-container {
          margin-bottom: 2rem;
        }
        
        h2 {
          color: var(--primary-color);
          margin-bottom: 1.5rem;
        }
        
        .filters {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        .filter-section {
          margin-bottom: 1rem;
        }
        
        h3 {
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        
        .genre-filters, .frequency-filters, .vibe-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        
        .filter-chip {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          background-color: #f5f5f5;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .filter-chip.selected {
          background-color: var(--primary-color);
          color: white;
        }
        
        .filter-chip input {
          position: absolute;
          opacity: 0;
        }
        
        .distance-filter {
          display: flex;
          align-items: center;
          gap: 1rem;
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
        
        .distance-value {
          font-weight: 600;
          color: var(--primary-color);
          width: 60px;
        }
        
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .results-count {
          color: var(--light-text);
        }
        
        .reader-results {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        .reader-card {
          display: flex;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          overflow: hidden;
        }
        
        .reader-avatar {
          flex: 0 0 120px;
        }
        
        .reader-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .reader-info {
          flex: 1;
          padding: 1.5rem;
        }
        
        .reader-info h3 {
          margin: 0 0 0.25rem;
        }
        
        .reader-location {
          color: var(--light-text);
          margin-bottom: 0.75rem;
        }
        
        .reader-vibes {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .vibe-tag {
          background-color: var(--secondary-color);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
        }
        
        .compatibility {
          margin-bottom: 1rem;
        }
        
        .compatibility-bar {
          height: 8px;
          background-color: #f5f5f5;
          border-radius: 4px;
          margin-bottom: 0.25rem;
        }
        
        .compatibility-fill {
          height: 100%;
          background-color: var(--primary-color);
          border-radius: 4px;
        }
        
        .compatibility-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--primary-color);
        }
        
        .common-books {
          margin-bottom: 1rem;
        }
        
        .common-count {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        
        .book-thumbnails {
          display: flex;
          gap: 0.5rem;
        }
        
        .book-thumbnail {
          width: 40px;
          height: 60px;
          border-radius: 4px;
          overflow: hidden;
        }
        
        .book-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .book-thumbnail.more {
          background-color: var(--secondary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
        }
        
        .reader-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          font-size: 1rem;
        }
        
        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.9rem;
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
        
        .view-toggle {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }
        
        .toggle-button {
          padding: 0.75rem 1.5rem;
          background-color: #f5f5f5;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .toggle-button:first-child {
          border-radius: var(--border-radius) 0 0 var(--border-radius);
        }
        
        .toggle-button:last-child {
          border-radius: 0 var(--border-radius) var(--border-radius) 0;
        }
        
        .toggle-button.active {
          background-color: var(--primary-color);
          color: white;
        }
        
        .map-container {
          height: 400px;
          background-color: #f5f5f5;
          border-radius: var(--border-radius);
          margin-bottom: 2rem;
        }
        
        .map-placeholder {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--light-text);
        }
        
        .nearby-books h2 {
          margin-bottom: 1.5rem;
        }
        
        .book-results {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        .nearby-book-card {
          display: flex;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          overflow: hidden;
        }
        
        .book-cover {
          flex: 0 0 100px;
        }
        
        .book-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .book-info {
          flex: 1;
          padding: 1rem;
        }
        
        .book-info h3 {
          margin: 0 0 0.25rem;
          font-size: 1.1rem;
        }
        
        .author {
          color: var(--light-text);
          margin-bottom: 0.75rem;
        }
        
        .book-owner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        
        .owner-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .owner-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .owner-info {
          display: flex;
          flex-direction: column;
        }
        
        .owner-name {
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .distance {
          font-size: 0.8rem;
          color: var(--light-text);
        }
        
        .sharing-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        
        .book-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .friend-requests {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        .request-card {
          display: flex;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 1.5rem;
        }
        
        .request-avatar {
          flex: 0 0 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 1.5rem;
        }
        
        .request-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .request-info {
          flex: 1;
        }
        
        .request-info h3 {
          margin: 0 0 0.25rem;
        }
        
        .request-vibes {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .request-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .friends-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        .friend-card {
          display: flex;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 1.5rem;
        }
        
        .friend-avatar {
          flex: 0 0 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 1.5rem;
          position: relative;
        }
        
        .friend-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .status-indicator {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #bdbdbd;
          border: 2px solid white;
        }
        
        .status-indicator.online {
          background-color: #4caf50;
        }
        
        .friend-info {
          flex: 1;
        }
        
        .friend-info h3 {
          margin: 0 0 0.25rem;
        }
        
        .last-active {
          color: var(--light-text);
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        
        .friend-actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }
        
        .empty-state {
          background-color: var(--secondary-color);
          padding: 2rem;
          text-align: center;
          border-radius: var(--border-radius);
        }
        
        .empty-state p {
          margin-bottom: 1rem;
        }
        
        @media (min-width: 768px) {
          .filters {
            grid-template-columns: 1fr 1fr;
          }
          
          .reader-results {
            grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          }
          
          .book-results {
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          }
          
          .friend-requests, .friends-list {
            grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}

export default withAuth(ExplorePage);
