import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: 'google' | 'credentials';
      emailVerified?: boolean;
      otpUserId?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    provider?: 'google' | 'credentials';
    accessToken?: string;
    emailVerified?: boolean;
    otpUserId?: string;
  }
}
