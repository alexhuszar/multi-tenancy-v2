'use server';

import { cookies } from 'next/headers';
import { SessionService } from '@multi-tenancy/appwrite';

export const getSessionClient = async () => {
  const session = (await cookies()).get('appwrite-session');
  
  if (!session?.value)  {
    throw new Error('No session found');
  }

  const sessionService = new SessionService()
  
  return sessionService.createUserSession(session.value)
};
