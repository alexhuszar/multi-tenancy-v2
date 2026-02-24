import NextAuth, { NextAuthOptions } from 'next-auth';
import type { Provider } from 'next-auth/providers/index';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { Client, Account } from 'node-appwrite';
import { appwriteConfig, SessionService } from '@multi-tenancy/appwrite';
import {
  getUserByEmail,
  getUserByid,
  createAccount,
  createGoogleUser,
} from '../../../actions/user.actions';

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    'Google OAuth requires GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET environment variables',
  );
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET environment variable is required');
}


type UserWithMeta = {
  provider?: 'google' | 'credentials';
  emailVerified?: boolean;
  otpUserId?: string;
};

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
    async authorize(credentials) {
      if (!credentials?.email) throw new Error('Email required');

      const { email, mode, name, password } = credentials;

      if (mode === 'signup') {
        const { accountId, otpUserId } = await createAccount({
          fullName: name ?? '',
          email,
          password,
        });

        return {
          id: accountId,
          email,
          name: name ?? '',
          provider: 'credentials' as const,
          emailVerified: false,
          otpUserId,
        };
      } else {

        const tempClient = new Client()
          .setEndpoint(appwriteConfig.endpointUrl)
          .setProject(appwriteConfig.projectId);
        const tempAccount = new Account(tempClient);

        let appwriteSession;
        try {
          appwriteSession = await tempAccount.createEmailPasswordSession({
            email,
            password,
          });
        } catch {
          throw new Error('Invalid email or password');
        }

        try {
          const { users } = new SessionService().createAdminSession();
          await users.deleteSession({
            userId: appwriteSession.userId,
            sessionId: appwriteSession.$id,
          });
        } catch {
          // Non-fatal: session will expire naturally
        }

        const appwriteUser = await getUserByid(appwriteSession.userId);
        if (!appwriteUser) throw new Error('No account found for this email');

        return {
          id: appwriteUser.$id,
          email,
          name: appwriteUser.fullName,
          provider: 'credentials' as const,
          emailVerified: true,
        };
      }
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
        const u = user as typeof user & UserWithMeta;
        token.accessToken = account?.access_token;
        token.id = user.id;
        token.provider = u.provider || account?.provider as 'google' | 'credentials' | undefined || 'credentials';
        token.emailVerified =
          u.emailVerified ?? (account?.provider === 'google' ? true : false);
        token.otpUserId = u.otpUserId;
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
