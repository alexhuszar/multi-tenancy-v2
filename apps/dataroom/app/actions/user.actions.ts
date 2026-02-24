'use server';


import {
  SessionService,
  UserService,
  OtpService,
  parseStringify,
  type UserRow,
  ID,
} from '@multi-tenancy/appwrite';

export const getUserByEmail = async (email: string): Promise<UserRow | null> => {
  const session = new SessionService();
 
  const { tablesDB, users } = session.createAdminSession();

  return new UserService(tablesDB, users).getByEmail(email);
};

export const getUserByid = async (
  id: string,
): Promise<UserRow | null> => {
  const session = new SessionService();

  const { tablesDB, users } = session.createAdminSession();

  return new UserService(tablesDB, users).getById(id);
};

export const createAccount = async ({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}): Promise<{ accountId: string; otpUserId: string }> => {
    const session = new SessionService(); 
  const { tablesDB, users, account } = session.createAdminSession();
  
  const userService = new UserService(tablesDB, users);

  const existing = await userService.getByEmail(email);
  
  if (existing) throw new Error('An account with this email already exists');

  const newUser = await userService.createAuthUser({
    userId: ID.unique(),
    email,
    password,
    name: fullName,
  });

  const otpService = new OtpService(account);

  const otpUserId = await otpService.sendEmailToken(email);

  await userService.createRow({
    email,
    fullName,
    accountId: newUser.$id,
    provider: 'credentials',
  });

  return parseStringify({ accountId: newUser.$id, otpUserId: otpUserId.userId });
};

export const createGoogleUser = async ({
  email,
  name,
  image,
  id,
}: {
  email: string;
  name: string;
  image?: string | null;
  id: string;
}) => {
  const session = new SessionService();

  const { tablesDB, users } = session.createAdminSession();

  return new UserService(tablesDB, users).createRow({
    email,
    fullName: name,
    avatar: image ?? undefined,
    accountId: id,
    provider: 'google',
  });
};
