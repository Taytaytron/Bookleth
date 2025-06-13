import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const loading = status === 'loading';
    
    useEffect(() => {
      if (!loading && !session) {
        router.replace('/auth/signin');
      }
    }, [session, loading, router]);
    
    if (loading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
          
          <style jsx>{`
            .loading-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
            }
            
            .loading-spinner {
              border: 4px solid rgba(0, 0, 0, 0.1);
              border-radius: 50%;
              border-top: 4px solid var(--primary-color);
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin-bottom: 1rem;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      );
    }
    
    if (!session) {
      return null;
    }
    
    return <Component {...props} session={session} />;
  };
}

export function useAuth() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  
  return {
    user: session?.user,
    isAuthenticated: !!session,
    isLoading: loading,
    signOut: () => signOut({ callbackUrl: '/' }),
  };
}
