import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navigation from '../../components/Navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError('Invalid email or password');
        setIsLoading(false);
        return;
      }

      router.push('/profile');
    } catch (error) {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-page">
      <Navigation />
      
      <div className="auth-container">
        <div className="auth-card">
          <h1>Sign In to Booklet</h1>
          <p className="auth-subtitle">Connect with readers through books, not appearances</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <Link href="/auth/forgot-password">
                <a className="forgot-password">Forgot password?</a>
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="social-divider">
            <span>or continue with</span>
          </div>
          
          <div className="social-buttons">
            <button 
              onClick={() => signIn('google', { callbackUrl: '/profile' })}
              className="btn btn-social btn-google"
            >
              <img src="/images/google-icon.png" alt="Google" />
              Google
            </button>
            
            <button 
              onClick={() => signIn('facebook', { callbackUrl: '/profile' })}
              className="btn btn-social btn-facebook"
            >
              <img src="/images/facebook-icon.png" alt="Facebook" />
              Facebook
            </button>
          </div>
          
          <div className="auth-footer">
            <p>Don't have an account? <Link href="/auth/signup"><a>Sign up</a></Link></p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 80px);
          padding: 2rem 1rem;
          background-color: var(--secondary-color);
        }
        
        .auth-card {
          background-color: white;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          padding: 2rem;
          width: 100%;
          max-width: 450px;
        }
        
        h1 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
          text-align: center;
        }
        
        .auth-subtitle {
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
        
        .auth-form {
          margin-bottom: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: var(--border-radius);
          font-family: inherit;
          font-size: 1rem;
        }
        
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }
        
        .remember-me {
          display: flex;
          align-items: center;
        }
        
        .remember-me input {
          width: auto;
          margin-right: 0.5rem;
        }
        
        .forgot-password {
          color: var(--primary-color);
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
        
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .social-divider {
          position: relative;
          text-align: center;
          margin: 1.5rem 0;
        }
        
        .social-divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background-color: #ddd;
          z-index: 0;
        }
        
        .social-divider span {
          position: relative;
          background-color: white;
          padding: 0 1rem;
          color: var(--light-text);
          font-size: 0.9rem;
          z-index: 1;
        }
        
        .social-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .btn-social {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: white;
          border: 1px solid #ddd;
          color: #333;
        }
        
        .btn-social img {
          width: 20px;
          height: 20px;
        }
        
        .btn-social:hover {
          background-color: #f5f5f5;
        }
        
        .auth-footer {
          text-align: center;
          font-size: 0.9rem;
        }
        
        .auth-footer a {
          color: var(--primary-color);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
