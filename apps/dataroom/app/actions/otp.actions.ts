'use server';

import {
  SessionService,
  OtpService,
  AppwriteRateLimiter,
  isRateLimitError,
} from '@multi-tenancy/appwrite';

export const sendEmailOtp = async (email: string): Promise<{userId:string}> => {
  const session = new SessionService();
  const { account, tablesDB } = session.createAdminSession();
  const rateLimiter = new AppwriteRateLimiter(tablesDB);

  try {
    const otpService = new OtpService(account, rateLimiter);
    return await otpService.sendEmailToken(email);
  } catch (error) {
    if (isRateLimitError(error)) {
      throw error;
    }

    throw new Error('Failed to send OTP email', { cause: error });
  }
};

export const verifyEmailOtp = async ({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}): Promise<void> => {
  const session = new SessionService();
  const { account } = session.createPublicSession();
  const { tablesDB } = session.createAdminSession();
  const rateLimiter = new AppwriteRateLimiter(tablesDB);

  try {
    const otpService = new OtpService(account, rateLimiter);

    await otpService.verifySession(userId, secret);
  } catch (error) {
    if (isRateLimitError(error)) {
      throw error;
    }

    throw new Error('OTP verification failed', { cause: error });
  }
};
