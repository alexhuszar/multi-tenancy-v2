import 'next-auth';
import 'next-auth/jwt';
import type { AppUserFields } from './auth';

export type { AppUserFields };

declare module 'next-auth' {
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
