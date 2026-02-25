import type { User } from 'next-auth';
import { SessionService } from '@multi-tenancy/appwrite';
import type { AppUserFields } from '../types/auth';
import { getUserById, createAccount } from './user.actions';
import { sendEmailOtp } from './otp.actions';

type AppUser = User & AppUserFields;

export async function authorizeSignUp(params: {
  name: string;
  email: string;
  password: string;
}): Promise<AppUser> {
  const { accountId } = await createAccount({
    fullName: params.name,
    email: params.email,
    password: params.password,
  });

  const { userId } = await sendEmailOtp(params.email);

  return {
    id: accountId,
    email: params.email,
    name: params.name,
    provider: 'credentials' as const,
    emailVerified: false,
    otpUserId: userId,
  };
}

export async function authorizeSignIn(params: {
  email: string;
  password: string;
}): Promise<AppUser> {
  const { account: tempAccount } = new SessionService().createPublicSession();

  let appwriteSession;
  try {
    appwriteSession = await tempAccount.createEmailPasswordSession({
      email: params.email,
      password: params.password,
    });
  } catch {
    throw new Error('Invalid email or password');
  }

  const { users } = new SessionService().createAdminSession();

  try {
    await users.deleteSession({
      userId: appwriteSession.userId,
      sessionId: appwriteSession.$id,
    });
  } catch {
    // Non-fatal: session will expire naturally
  }

  const appwriteUser = await getUserById(appwriteSession.userId);
  if (!appwriteUser) throw new Error('No account found for this email');

  const appwriteAccount = await users.get({ userId: appwriteSession.userId });

  if (!appwriteAccount.emailVerification) {
    const { userId } = await sendEmailOtp(params.email);
    return {
      id: appwriteUser.$id,
      email: params.email,
      name: appwriteUser.fullName,
      provider: 'credentials' as const,
      emailVerified: false,
      otpUserId: userId,
    };
  }

  return {
    id: appwriteUser.$id,
    email: params.email,
    name: appwriteUser.fullName,
    provider: 'credentials' as const,
    emailVerified: true,
  };
}
