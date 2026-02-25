'use client';

import React, { createContext, useContext, useCallback, useMemo } from 'react';
import {
  useSession,
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from 'next-auth/react';
import { useRouter } from 'next/navigation';

type User = {
  email: string;
  name: string;
  accountId: string;
};

type AuthResult = {
  accountId: string;
  otpUserId?: string;
  error?: string;
} | null;

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signUp: (name: string, email: string, password: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  getCurrentUser: () => User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const user: User | null = useMemo(() => {
    if (!session?.user) return null;

    const email = session.user.email;
    const name = session.user.name;

    if (!email || !name) return null;

    return {
      email,
      name,
      accountId: email,
    };
  }, [session]);

  const authenticate = useCallback(
    async (
      mode: 'signin' | 'signup',
      params: Record<string, string>,
    ): Promise<AuthResult> => {
      try {
        const result = await nextAuthSignIn('credentials', {
          ...params,
          mode,
          redirect: false,
        });

        // Server issued a redirect (e.g. signup → /verify-email after OTP sent)
        if (!result?.ok && result?.url) {
          router.push(result.url);
          return null;
        }

        if (result?.error) {
          return { accountId: '', error: result.error };
        }

        if (!result?.ok) return null;

        return { accountId: params.email };
      } catch (error) {
        return {
          accountId: '',
          error: `Authentication failed. Please try again. ${error instanceof Error ? error.message : ''}`,
        };
      }
    },
    [router],
  );

  const signUp = useCallback(
    (name: string, email: string, password: string) =>
      authenticate('signup', { name, email, password }),
    [authenticate],
  );

  const signIn = useCallback(
    (email: string, password: string) =>
      authenticate('signin', { email, password }),
    [authenticate],
  );

  const signOut = useCallback(async () => {
    try {
      await nextAuthSignOut({
        redirect: true,
        callbackUrl: '/sign-in',
      });
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  }, []);

  const isLoading = status === 'loading';
  const isAuthenticated = Boolean(user);
  const getCurrentUser = useCallback(() => user, [user]);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      signUp,
      signIn,
      signOut,
      getCurrentUser,
    }),
    [user, isLoading, isAuthenticated, signUp, signIn, signOut, getCurrentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
