import React, { useState } from 'react';
import { withAuth } from '../utils/auth';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import BookCard from '../components/BookCard';
import { getShareableBooks } from '../data/mockData';

function SharingPage({ session }) {
  const [activeTab, setActiveTab] = useState('share');
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [condition, setCondition] = useState('good');
  const [duration, setDuration] = useState('2_weeks');
  const [deliveryMethod, setDeliveryMethod] = useState('in_person');
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  // Mock data for shared books
  const mySharedBooks = getShareableBooks(1);
  const borrowedBooks = getShareableBooks(2).slice(0, 2);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSuccess('Kitap başarıyla paylaşım listesine eklendi!');
    setIsLoading(false);
    
    // Reset form
    setBookTitle('');
    setAuthor('');
    setCondition('good');
    setDuration('2_weeks');
    setDeliveryMethod('in_person');
    setNotes('');
    
    // Clear success message after 5 seconds
    setTimeout(() => {
      setSuccess('');
    }, 5000);
  };
  
  return (
    <div className="sharing-page">
      <Navigation activePage="sharing" />
      
      <div className="sharing-header">
        <div className="container">
          <h1>Kitaplarınızı Paylaşın, Hikayeleri Bağlantılara Dönüştürün</h1>
          <p className="subtitle">Kitaplarınızı ödünç vererek yeni arkadaşlıklar kurun</p>
        </div>
      </div>
      
      <div className="container">
        <div className="sharing-tabs">
          <button 
            className={`tab-button ${activeTab === 'share' ? 'active' : ''}`}
            onClick={() => setActiveTab('share')}
          >
            Kitap Paylaş
          </button>
          <button 
            className={`tab-button ${activeTab === 'my-books' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-books')}
          >
            Paylaşılan Kitaplarım
          </button>
          <button 
            className={`tab-button ${activeTab === 'tracking' ? 'active' : ''}`}
            onClick={() => setActiveTab('tracking')}
          >
            Paylaşım Takibi
          </button>
          <button 
            className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            İstatistikler
          </button>
        </div>
        
        {activeTab === 'share' && (
          <div className="sharing-content">
            <div className="sharing-form-container">
              <h2>Yeni Kitap Ekle</h2>
              
              {success && (
                <div className="success-message">
                  {success}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="sharing-form">
                <div className="form-group">
                  <label htmlFor="bookTitle">Kitap Başlığı</label>
                  <input
                    type="text"
                    id="bookTitle"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    required
                    placeholder="Kitabın tam adını girin"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="author">Yazar</label>
                  <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    placeholder="Yazarın adını girin"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="condition">Kitap Durumu</label>
                    <select
                      id="condition"
                      value={condition}
                      onChange={(e) => setCondition(e.target.value)}
                    >
                      <option value="new">Yeni gibi (hiç okunmamış)</option>
                      <option value="good">İyi durumda (birkaç kez okunmuş)</option>
                      <option value="used">Çok okunmuş (sevilerek okunmuş)</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="duration">Paylaşım Süresi</label>
                    <select
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option value="1_week">1 hafta</option>
                      <option value="2_weeks">2 hafta</option>
                      <option value="1_month">1 ay</option>
                      <option value="flexible">Belirsiz (anlaşmaya bağlı)</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="deliveryMethod">Teslim Yöntemi</label>
                  <div className="delivery-options">
                    <label className={`delivery-option ${deliveryMethod === 'in_person' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="in_person"
                        checked={deliveryMethod === 'in_person'}
                        onChange={() => setDeliveryMethod('in_person')}
                      />
                      <div className="option-content">
                        <h4>Yüz yüze buluşma</h4>
                        <p>Güvenli bir yerde buluşup kitabı elden teslim edin</p>
                      </div>
                    </label>
                    
                    <label className={`delivery-option ${deliveryMethod === 'booklet_courier' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="booklet_courier"
                        checked={deliveryMethod === 'booklet_courier'}
                        onChange={() => setDeliveryMethod('booklet_courier')}
                      />
                      <div className="option-content">
                        <h4>Booklet kurye</h4>
                        <p>5 km yarıçap içinde Booklet kuryesi ile gönderim</p>
                      </div>
                    </label>
                    
                    <label className={`delivery-option ${deliveryMethod === 'shipping' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="deliveryMethod"
                        value="shipping"
                        checked={deliveryMethod === 'shipping'}
                        onChange={() => setDeliveryMethod('shipping')}
                      />
                      <div className="option-content">
                        <h4>Kargo ile gönderim</h4>
                        <p>Uzak mesafeler için kargo ile gönderim (ücretli)</p>
                      </div>
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="notes">Notlar (Opsiyonel)</label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Kitap hakkında eklemek istediğiniz notlar..."
                    rows={3}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="bookCover">Kitap Kapağı</label>
                  <div className="file-upload">
                    <input
                      type="file"
                      id="bookCover"
                      accept="image/*"
                    />
                    <div className="upload-placeholder">
                      <span>Kitap kapağı yüklemek için tıklayın veya sürükleyin</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Ekleniyor...' : 'Kitabı Paylaş'}
                </button>
              </form>
            </div>
          </div>
        )}
        
        {activeTab === 'my-books' && (
          <div className="sharing-content">
            <h2>Paylaşılan Kitaplarım</h2>
            
            {mySharedBooks.length > 0 ? (
              <div className="shared-books-grid">
                {mySharedBooks.map(book => (
                  <div key={book.id} className="shared-book-card">
                    <div className="book-cover">
                      <img src={book.coverImage} alt={book.title} />
                      <div className={`status-badge ${book.status === 'available' ? 'available' : book.status === 'borrowed' ? 'borrowed' : 'reserved'}`}>
                        {book.status === 'available' ? 'Müsait' : book.status === 'borrowed' ? 'Ödünç Verildi' : 'Rezerve'}
                      </div>
                    </div>
                    <div className="book-info">
                      <h3>{book.title}</h3>
                      <p className="author">{book.author}</p>
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
                        <button className="btn btn-secondary btn-sm">Düzenle</button>
                        <button className="btn btn-danger btn-sm">Kaldır</button>
                        {book.status === 'available' ? (
                          <button className="btn btn-warning btn-sm">Paylaşımı Durdur</button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Henüz paylaşılan kitabınız bulunmuyor.</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setActiveTab('share')}
                >
                  Kitap Paylaş
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'tracking' && (
          <div className="sharing-content">
            <div className="tracking-container">
              <div className="tracking-section">
                <h2>Ödünç Verilen Kitaplar</h2>
                
                {mySharedBooks.filter(book => book.status === 'borrowed').length > 0 ? (
                  <div className="tracking-books">
                    {mySharedBooks
                      .filter(book => book.status === 'borrowed')
                      .map(book => (
                        <div key={book.id} className="tracking-book-card">
                          <div className="book-cover">
                            <img src={book.coverImage} alt={book.title} />
                          </div>
                          <div className="tracking-info">
                            <h3>{book.title}</h3>
                            <p className="author">{book.author}</p>
                            <div className="borrower-info">
                              <span className="avatar">
                                <img src="/images/placeholder-avatar.jpg" alt="Borrower" />
                              </span>
                              <span className="name">Ahmet Y.</span>
                            </div>
                            <div className="date-info">
                              <div className="date">
                                <strong>Başlangıç:</strong> 1 Haziran 2025
                              </div>
                              <div className="date">
                                <strong>Bitiş:</strong> 15 Haziran 2025
                              </div>
                            </div>
                            <div className="remaining-time">
                              <div className="progress-bar">
                                <div className="progress" style={{ width: '60%' }}></div>
                              </div>
                              <div className="days-left">5 gün kaldı</div>
                            </div>
                            <button className="btn btn-primary btn-sm">İletişime Geç</button>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="empty-state small">
                    <p>Şu anda ödünç verilen kitabınız bulunmuyor.</p>
                  </div>
                )}
              </div>
              
              <div className="tracking-section">
                <h2>Ödünç Alınan Kitaplar</h2>
                
                {borrowedBooks.length > 0 ? (
                  <div className="tracking-books">
                    {borrowedBooks.map(book => (
                      <div key={book.id} className="tracking-book-card">
                        <div className="book-cover">
                          <img src={book.coverImage} alt={book.title} />
                        </div>
                        <div className="tracking-info">
                          <h3>{book.title}</h3>
                          <p className="author">{book.author}</p>
                          <div className="borrower-info">
                            <span className="avatar">
                              <img src="/images/placeholder-avatar.jpg" alt="Owner" />
                            </span>
                            <span className="name">Zeynep K.</span>
                          </div>
                          <div className="date-info">
                            <div className="date">
                              <strong>Başlangıç:</strong> 28 Mayıs 2025
                            </div>
                            <div className="date">
                              <strong>Bitiş:</strong> 11 Haziran 2025
                            </div>
                          </div>
                          <div className="remaining-time">
                            <div className="progress-bar">
                              <div className="progress" style={{ width: '80%' }}></div>
                            </div>
                            <div className="days-left">2 gün kaldı</div>
                          </div>
                          <div className="action-buttons">
                            <button className="btn btn-primary btn-sm">İade Et</button>
                            <button className="btn btn-secondary btn-sm">Süre Uzat</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state small">
                    <p>Şu anda ödünç aldığınız kitap bulunmuyor.</p>
                    <Link href="/explore">
                      <a className="btn btn-secondary btn-sm">Kitap Keşfet</a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div className="sharing-content">
            <h2>Paylaşım İstatistikleriniz</h2>
            
            <div className="stats-container">
              <div className="stats-card">
                <div className="stat-number">7</div>
                <div className="stat-label">Toplam Paylaşılan Kitap</div>
              </div>
              
              <div className="stats-card">
                <div className="stat-number">3</div>
                <div className="stat-label">Aktif Paylaşımlar</div>
              </div>
              
              <div className="stats-card">
                <div className="stat-number">4</div>
                <div className="stat-label">Tamamlanan Paylaşımlar</div>
              </div>
              
              <div className="stats-card">
                <div className="stat-number">85</div>
                <div className="stat-label">Paylaşım Puanı</div>
              </div>
            </div>
            
            <div className="stats-section">
              <h3>En Çok Paylaşılan Türler</h3>
              <div className="genre-stats">
                <div className="genre-bar">
                  <div className="genre-name">Roman</div>
                  <div className="genre-progress-container">
                    <div className="genre-progress" style={{ width: '70%' }}></div>
                  </div>
                  <div className="genre-count">5</div>
                </div>
                
                <div className="genre-bar">
                  <div className="genre-name">Bilim Kurgu</div>
                  <div className="genre-progress-container">
                    <div className="genre-progress" style={{ width: '40%' }}></div>
                  </div>
                  <div className="genre-count">3</div>
                </div>
                
                <div className="genre-bar">
                  <div className="genre-name">Tarih</div>
                  <div className="genre-progress-container">
                    <div className="genre-progress" style={{ width: '30%' }}></div>
                  </div>
                  <div className="genre-count">2</div>
                </div>
              </div>
            </div>
            
            <div className="stats-section">
              <h3>Paylaşım Rozetleri</h3>
              <div className="badges-container">
                <div className="badge earned">
                  <div className="badge-icon">🔰</div>
                  <div className="badge-info">
                    <h4>Başlangıç</h4>
                    <p>3+ kitap paylaşımı</p>
                  </div>
                </div>
                
                <div className="badge earned">
                  <div className="badge-icon">📚</div>
                  <div className="badge-info">
                    <h4>Kütüphaneci</h4>
                    <p>10+ kitap paylaşımı</p>
                  </div>
                </div>
                
                <div className="badge">
                  <div className="badge-icon">🏆</div>
                  <div className="badge-info">
                    <h4>Edebiyat Elçisi</h4>
                    <p>25+ kitap paylaşımı</p>
                    <div className="badge-progress">
                      <div className="badge-progress-bar">
                        <div className="badge-progress-fill" style={{ width: '28%' }}></div>
                      </div>
                      <div className="badge-progress-text">7/25</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .sharing-header {
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
        
        .sharing-tabs {
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
        
        .sharing-content {
          margin-bottom: 3rem;
        }
        
        .sharing-form-container {
          max-width: 800px;
          margin: 0 auto;
        }
        
        h2 {
          color: var(--primary-color);
          margin-bottom: 1.5rem;
        }
        
        .success-message {
          background-color: #e8f5e9;
          color: #2e7d32;
          padding: 1rem;
          border-radius: var(--border-radius);
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .sharing-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 0;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        input, select, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          font-family: inherit;
          font-size: 1rem;
        }
        
        .delivery-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .delivery-option {
          display: flex;
          align-items: flex-start;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .delivery-option.selected {
          border-color: var(--primary-color);
          background-color: rgba(106, 76, 147, 0.05);
        }
        
        .delivery-option input {
          margin-top: 0.25rem;
          margin-right: 1rem;
          width: auto;
        }
        
        .option-content h4 {
          margin: 0 0 0.25rem;
          font-size: 1.1rem;
        }
        
        .option-content p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--light-text);
        }
        
        .file-upload {
          border: 2px dashed #ddd;
          border-radius: var(--border-radius);
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .file-upload:hover {
          border-color: var(--primary-color);
        }
        
        .upload-placeholder {
          color: var(--light-text);
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
        
        .btn-danger {
          background-color: #ffebee;
          color: #c62828;
        }
        
        .btn-danger:hover {
          background-color: #ffcdd2;
        }
        
        .btn-warning {
          background-color: #fff8e1;
          color: #f57f17;
        }
        
        .btn-warning:hover {
          background-color: #ffecb3;
        }
        
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .shared-books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .shared-book-card {
          display: flex;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          overflow: hidden;
        }
        
        .book-cover {
          flex: 0 0 100px;
          position: relative;
        }
        
        .book-cover img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .status-badge {
          position: absolute;
          top: 0.5rem;
          left: 0;
          padding: 0.25rem 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          border-radius: 0 4px 4px 0;
        }
        
        .status-badge.available {
          background-color: #4caf50;
        }
        
        .status-badge.borrowed {
          background-color: #f57f17;
        }
        
        .status-badge.reserved {
          background-color: #2196f3;
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
        
        .empty-state {
          background-color: var(--secondary-color);
          padding: 2rem;
          text-align: center;
          border-radius: var(--border-radius);
        }
        
        .empty-state.small {
          padding: 1rem;
        }
        
        .empty-state p {
          margin-bottom: 1rem;
        }
        
        .tracking-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        .tracking-section h2 {
          margin-bottom: 1rem;
        }
        
        .tracking-books {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }
        
        .tracking-book-card {
          display: flex;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          overflow: hidden;
        }
        
        .tracking-info {
          flex: 1;
          padding: 1rem;
        }
        
        .borrower-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }
        
        .avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .date-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }
        
        .remaining-time {
          margin-bottom: 1rem;
        }
        
        .progress-bar {
          height: 8px;
          background-color: #f5f5f5;
          border-radius: 4px;
          margin-bottom: 0.25rem;
        }
        
        .progress {
          height: 100%;
          background-color: var(--primary-color);
          border-radius: 4px;
        }
        
        .days-left {
          font-size: 0.85rem;
          text-align: right;
        }
        
        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }
        
        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .stats-card {
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 1.5rem;
          text-align: center;
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: var(--light-text);
        }
        
        .stats-section {
          margin-bottom: 2rem;
        }
        
        .stats-section h3 {
          color: var(--primary-color);
          margin-bottom: 1rem;
        }
        
        .genre-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .genre-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .genre-name {
          flex: 0 0 100px;
        }
        
        .genre-progress-container {
          flex: 1;
          height: 12px;
          background-color: #f5f5f5;
          border-radius: 6px;
        }
        
        .genre-progress {
          height: 100%;
          background-color: var(--primary-color);
          border-radius: 6px;
        }
        
        .genre-count {
          flex: 0 0 30px;
          text-align: right;
          font-weight: 600;
        }
        
        .badges-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: var(--border-radius);
          background-color: #f5f5f5;
        }
        
        .badge.earned {
          background-color: #e8f5e9;
        }
        
        .badge-icon {
          font-size: 2rem;
        }
        
        .badge-info h4 {
          margin: 0 0 0.25rem;
        }
        
        .badge-info p {
          margin: 0 0 0.5rem;
          font-size: 0.9rem;
          color: var(--light-text);
        }
        
        .badge-progress {
          margin-top: 0.5rem;
        }
        
        .badge-progress-bar {
          height: 6px;
          background-color: #ddd;
          border-radius: 3px;
          margin-bottom: 0.25rem;
        }
        
        .badge-progress-fill {
          height: 100%;
          background-color: var(--primary-color);
          border-radius: 3px;
        }
        
        .badge-progress-text {
          font-size: 0.8rem;
          text-align: right;
        }
        
        @media (min-width: 768px) {
          .tracking-container {
            grid-template-columns: 1fr 1fr;
          }
          
          .tracking-books {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default withAuth(SharingPage);
