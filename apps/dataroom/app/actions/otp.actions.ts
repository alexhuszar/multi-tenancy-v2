'use server';

import {
  SessionService,
  OtpService,
  isRateLimitError,
} from '@multi-tenancy/appwrite';

export const sendEmailOtp = async (email: string): Promise<string> => {
  const session = new SessionService();
  const { account } = session.createAdminSession();

  try {
    const otpService = new OtpService(account);
    const sendOtp = await otpService.sendEmailToken(email);

    return sendOtp.userId;
  } catch (error) {
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
  const { account } = await session.createAdminSession();

  try {
    const otpService = new OtpService(account);

    await otpService.verifySession(userId, secret);
  } catch (error) {
    if (isRateLimitError(error)) {
      throw error;
    }

    throw new Error('OTP verification failed', { cause: error });
  }
};
