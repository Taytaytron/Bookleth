import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

// In a real application, we would connect to a database
// For this demo, we'll use a simple mock user
const mockUsers = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123', // In a real app, this would be hashed
    image: '/images/placeholder-avatar.jpg',
    emailVerified: new Date(),
  }
];

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // In a real app, you would look this up in a database
        const user = mockUsers.find(user => 
          user.email === credentials.email && 
          user.password === credentials.password
        );
        
        if (user) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        }
        
        return null;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'mock-google-client-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock-google-client-secret',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || 'mock-facebook-client-id',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || 'mock-facebook-client-secret',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/preferences'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'this-is-a-secret-key-for-development',
});
