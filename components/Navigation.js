import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/auth';

export default function Navigation({ activePage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navigation">
      <div className="container">
        <div className="nav-logo">
          <Link href="/">
            <a className="logo">Booklet</a>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          <Link href="/">
            <a className={activePage === 'home' ? 'active' : ''}>Home</a>
          </Link>
          <Link href="/explore">
            <a className={activePage === 'explore' ? 'active' : ''}>Explore</a>
          </Link>
          {isAuthenticated ? (
            <>
              <Link href="/profile">
                <a className={activePage === 'profile' ? 'active' : ''}>Profile</a>
              </Link>
              <Link href="/sharing">
                <a className={activePage === 'sharing' ? 'active' : ''}>Book Sharing</a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <a className={activePage === 'signin' ? 'active' : ''}>Sign In</a>
              </Link>
              <Link href="/auth/signup">
                <a className={activePage === 'signup' ? 'active' : ''}>Sign Up</a>
              </Link>
            </>
          )}
        </div>
        
        <div className="nav-actions">
          <button className="btn-search" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          {isAuthenticated && (
            <button className="btn-notifications" aria-label="Notifications">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
          )}
          
          {isAuthenticated ? (
            <div className="user-menu">
              <div className="user-avatar">
                <img src={user?.image || "/images/placeholder-avatar.jpg"} alt={user?.name || "User"} />
              </div>
              <div className="user-dropdown">
                <Link href="/profile">
                  <a>My Profile</a>
                </Link>
                <Link href="/settings/profile">
                  <a>Settings</a>
                </Link>
                <button onClick={signOut} className="sign-out-btn">
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons desktop-only">
              <Link href="/auth/signin">
                <a className="btn btn-secondary btn-sm">Sign In</a>
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <div className="mobile-nav-links">
            <Link href="/">
              <a className={activePage === 'home' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </a>
            </Link>
            <Link href="/explore">
              <a className={activePage === 'explore' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
                Explore
              </a>
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/profile">
                  <a className={activePage === 'profile' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
                    Profile
                  </a>
                </Link>
                <Link href="/sharing">
                  <a className={activePage === 'sharing' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
                    Book Sharing
                  </a>
                </Link>
                <Link href="/settings/profile">
                  <a onClick={() => setIsMobileMenuOpen(false)}>
                    Settings
                  </a>
                </Link>
                <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="mobile-sign-out">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <a className={activePage === 'signin' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </a>
                </Link>
                <Link href="/auth/signup">
                  <a className={activePage === 'signup' ? 'active' : ''} onClick={() => setIsMobileMenuOpen(false)}>
                    Sign Up
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .navigation {
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .nav-logo {
          flex: 0 0 auto;
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
          text-decoration: none;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        
        .nav-links a {
          text-decoration: none;
          color: var(--light-text);
          font-weight: 500;
          transition: color 0.3s ease;
          padding: 0.5rem 0;
          min-height: 44px;
          display: flex;
          align-items: center;
        }
        
        .nav-links a:hover {
          color: var(--primary-color);
        }
        
        .nav-links a.active {
          color: var(--primary-color);
          border-bottom: 2px solid var(--primary-color);
        }
        
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .btn-search, .btn-notifications {
          background: none;
          border: none;
          color: var(--light-text);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease;
          min-height: 44px;
          min-width: 44px;
        }
        
        .btn-search:hover, .btn-notifications:hover {
          background-color: var(--secondary-color);
          color: var(--primary-color);
        }
        
        .user-menu {
          position: relative;
        }
        
        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          cursor: pointer;
        }
        
        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 0.5rem 0;
          min-width: 150px;
          display: none;
        }
        
        .user-menu:hover .user-dropdown {
          display: block;
        }
        
        .user-dropdown a,
        .user-dropdown button {
          display: block;
          padding: 0.75rem 1rem;
          color: var(--text-color);
          text-decoration: none;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        
        .user-dropdown a:hover,
        .user-dropdown button:hover {
          background-color: var(--secondary-color);
        }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--light-text);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 4px;
          min-height: 44px;
          min-width: 44px;
          align-items: center;
          justify-content: center;
        }
        
        .mobile-nav {
          background-color: white;
          border-top: 1px solid #eee;
          padding: 1rem 0;
        }
        
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 1rem;
        }
        
        .mobile-nav-links a,
        .mobile-nav-links button {
          padding: 0.75rem 1rem;
          color: var(--light-text);
          text-decoration: none;
          border-radius: var(--border-radius);
          transition: background-color 0.3s ease;
          border: none;
          background: none;
          text-align: left;
          cursor: pointer;
          min-height: 44px;
          display: flex;
          align-items: center;
        }
        
        .mobile-nav-links a:hover,
        .mobile-nav-links button:hover {
          background-color: var(--secondary-color);
          color: var(--primary-color);
        }
        
        .mobile-nav-links a.active {
          background-color: var(--primary-color);
          color: white;
        }
        
        .btn {
          padding: 0.5rem 1rem;
          border-radius: var(--border-radius);
          font-weight: 600;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
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
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          
          .mobile-menu-btn {
            display: flex;
          }
          
          .desktop-only {
            display: none;
          }
          
          .nav-actions {
            gap: 0.5rem;
          }
          
          .btn-search, .btn-notifications {
            padding: 0.4rem;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-nav {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

