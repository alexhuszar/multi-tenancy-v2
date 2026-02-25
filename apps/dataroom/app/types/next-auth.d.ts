import 'next-auth';
import 'next-auth/jwt';

type AppUserFields = {
  provider?: 'google' | 'credentials';
  emailVerified?: boolean;
  otpUserId?: string;
};

declare module 'next-auth' {
  interface User {
    provider?: 'google' | 'credentials';
    emailVerified?: boolean;
    otpUserId?: string;
  }

  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & AppUserFields;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends AppUserFields {
    id?: string;
    accessToken?: string;
  }
}
