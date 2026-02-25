import NextAuth, { NextAuthOptions, User } from 'next-auth';
import type { Provider } from 'next-auth/providers/index';
import type { AppUserFields } from '../../../types/next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { getUserByEmail, createGoogleUser } from '../../../actions/user.actions';
import { authorizeSignUp, authorizeSignIn } from '../../../actions/auth.service';

type AppUser = User & AppUserFields;
const isAppUser = (user: User): user is AppUser => 'emailVerified' in user;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    'Google OAuth requires GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables',
  );
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET environment variable is required');
}

const providers: Provider[] = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: {
      params: {
        prompt: 'consent',
        response_type: 'code',
      },
    },
  }),
  CredentialsProvider({
    name: 'credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
      name: { label: 'Name', type: 'text' },
      mode: { label: 'Mode', type: 'text' },
    },
    async authorize(credentials): Promise<AppUser | null> {
      if (!credentials?.email) throw new Error('Email required');
      const { email, mode, name, password } = credentials;
      return mode === 'signup'
        ? authorizeSignUp({ name: name ?? '', email, password })
        : authorizeSignIn({ email, password });
    },
  }),
];

export const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        const existingUser = await getUserByEmail(user.email);

        if (!existingUser) {
          const doc = await createGoogleUser({
            email: user.email,
            name: user.name ?? user.email.split('@')[0],
            image: user.image,
            id: user.id,
          });
          user.id = doc.$id;
        } else {
          user.id = existingUser.$id;
        }
      }

      return true;
    },

    async jwt({ token, user, account, trigger, session: updateSession }) {
      // Allow client-side session update (e.g. after OTP verification)
      if (trigger === 'update' && updateSession?.emailVerified !== undefined) {
        token.emailVerified = updateSession.emailVerified;
      }

      if (user) {
        token.accessToken = account?.access_token;
        token.id = user.id;

        if (isAppUser(user)) {
          token.provider = user.provider;
          token.emailVerified = user.emailVerified ?? false;
          token.otpUserId = user.otpUserId;
        } else {
          token.provider = account?.provider as 'google' | 'credentials' | undefined;
          token.emailVerified = account?.provider === 'google';
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.accessToken = token.accessToken as string | undefined;
        session.user.id = token.id || '';
        session.user.provider = token.provider || 'credentials';
        session.user.emailVerified = token.emailVerified;
        session.user.otpUserId = token.otpUserId;
      }

      return session;
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },

  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
