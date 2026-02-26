import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { useSession, getSession, signIn, signOut } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  getSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

function TestConsumer() {
  const auth = useAuth();

  return (
    <div>
      <span data-testid="loading">{String(auth.isLoading)}</span>
      <span data-testid="authenticated">{String(auth.isAuthenticated)}</span>
      <span data-testid="user-email">{auth.user?.email ?? 'null'}</span>
      <span data-testid="user-account-id">{auth.user?.accountId ?? 'null'}</span>

      <button onClick={() => auth.signIn('test@mail.com', 'password')}>
        sign-in
      </button>

      <button
        onClick={() => auth.signUp('Test User', 'test@mail.com', 'password')}
      >
        sign-up
      </button>

      <button onClick={() => auth.signOut()}>sign-out</button>
    </div>
  );
}

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exposes loading state when session is loading', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: 'loading',
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
  });

  it('maps authenticated user correctly from session', () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          id: '1',
          email: 'test@mail.com',
          name: 'Test User',
          provider: 'credentials',
          emailVerified: true,
        },
      },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId('authenticated')).toHaveTextContent('true');
    expect(screen.getByTestId('user-email')).toHaveTextContent('test@mail.com');
    expect(screen.getByTestId('user-account-id')).toHaveTextContent('1');
  });

  it('isAuthenticated is false when emailVerified is false', () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          id: 'user-123',
          email: 'test@mail.com',
          name: 'Test User',
          provider: 'credentials',
          emailVerified: false,
        },
      },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('user-email')).toHaveTextContent('test@mail.com');
  });

  it('signIn returns accountId from session on success', async () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'unauthenticated',
      data: null,
    });

    (signIn as jest.Mock).mockResolvedValue({ ok: true });
    (getSession as jest.Mock).mockResolvedValue({
      user: { id: 'appwrite-real-id', emailVerified: true },
    });

    let capturedResult: Awaited<ReturnType<ReturnType<typeof useAuth>['signIn']>> | undefined;

    function SignInConsumer() {
      const auth = useAuth();
      return (
        <button
          onClick={async () => {
            capturedResult = await auth.signIn('test@mail.com', 'password');
          }}
        >
          sign-in
        </button>
      );
    }

    render(
      <AuthProvider>
        <SignInConsumer />
      </AuthProvider>,
    );

    await act(async () => {
      screen.getByText('sign-in').click();
    });

    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'test@mail.com',
      password: 'password',
      mode: 'signin',
      redirect: false,
    });

    expect(capturedResult).toEqual({ accountId: 'appwrite-real-id' });
  });

  it('signUp returns error when NextAuth returns error', async () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'unauthenticated',
      data: null,
    });

    (signIn as jest.Mock).mockResolvedValue({
      error: 'Invalid credentials',
    });

    let capturedResult: Awaited<ReturnType<ReturnType<typeof useAuth>['signUp']>> | undefined;

    function SignUpConsumer() {
      const auth = useAuth();
      return (
        <button
          onClick={async () => {
            capturedResult = await auth.signUp('Test User', 'test@mail.com', 'password');
          }}
        >
          sign-up
        </button>
      );
    }

    render(
      <AuthProvider>
        <SignUpConsumer />
      </AuthProvider>,
    );

    await act(async () => {
      screen.getByText('sign-up').click();
    });

    expect(signIn).toHaveBeenCalledWith('credentials', {
      name: 'Test User',
      email: 'test@mail.com',
      password: 'password',
      mode: 'signup',
      redirect: false,
    });

    expect(capturedResult).toEqual({ accountId: '', error: 'Invalid credentials' });
  });

  it('handles signIn exception gracefully and returns error result', async () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'unauthenticated',
      data: null,
    });

    (signIn as jest.Mock).mockRejectedValue(new Error('Network error'));

    let capturedResult: Awaited<ReturnType<ReturnType<typeof useAuth>['signIn']>> | undefined;

    function SignInConsumer() {
      const auth = useAuth();
      return (
        <button
          onClick={async () => {
            capturedResult = await auth.signIn('test@mail.com', 'password');
          }}
        >
          sign-in
        </button>
      );
    }

    render(
      <AuthProvider>
        <SignInConsumer />
      </AuthProvider>,
    );

    await act(async () => {
      screen.getByText('sign-in').click();
    });

    expect(capturedResult).toEqual({
      accountId: '',
      error: expect.stringContaining('Network error'),
    });
  });

  it('calls nextAuth signOut with correct params', async () => {
    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          id: '1',
          email: 'test@mail.com',
          name: 'Test',
          provider: 'credentials',
          emailVerified: true,
        },
      },
    });

    (signOut as jest.Mock).mockResolvedValue(undefined);

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    await act(async () => {
      screen.getByText('sign-out').click();
    });

    expect(signOut).toHaveBeenCalledWith({
      redirect: true,
      callbackUrl: '/sign-in',
    });
  });

  it('logs error when signOut fails', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => null);

    (useSession as jest.Mock).mockReturnValue({
      status: 'authenticated',
      data: {
        user: {
          id: '1',
          email: 'test@mail.com',
          name: 'Test',
          provider: 'credentials',
          emailVerified: true,
        },
      },
    });

    (signOut as jest.Mock).mockRejectedValue(new Error('Logout failed'));

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    await act(async () => {
      screen.getByText('sign-out').click();
    });

    expect(console.error).toHaveBeenCalledWith(
      'Sign out failed:',
      expect.any(Error),
    );
  });
});

describe('useAuth', () => {
  it('throws error when used outside AuthProvider', () => {
    const BrokenConsumer = () => {
      useAuth();
      return null;
    };

    expect(() => render(<BrokenConsumer />)).toThrow(
      'useAuth must be used within an AuthProvider',
    );
  });
});
