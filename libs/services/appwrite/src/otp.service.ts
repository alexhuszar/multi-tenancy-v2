import { ID, Account, Users, AppwriteException } from 'node-appwrite';
import { AppwriteRateLimiter } from './otp-rate-limiter';

export class OtpService {
  constructor(
    private readonly account: Account,
    private readonly rateLimiter: AppwriteRateLimiter,
    private readonly users?: Users,
  ) {}

  async sendEmailToken(email: string): Promise<{ userId: string }> {
    this.validateEmail(email);

    await this.rateLimiter.checkSendCooldown(email);

    try {
      const result = await this.account.createEmailToken({
        userId: ID.unique(),
        email,
      });

      return { userId: result.userId };
    } catch (error) {
      this.handleAppwriteError(error, 'Failed to send OTP email');
    }

    await this.rateLimiter.recordEmailSend(email);
  }

  async verifySession(
    userId: string,
    secret: string,
  ): Promise<{ success: true }> {
    this.validateUserId(userId);
    this.validateSecret(secret);

    await this.rateLimiter.checkVerifyLimit(userId);

    let session: Awaited<ReturnType<Account['createSession']>> | undefined;
    try {
      session = await this.account.createSession({ userId, secret });
    } catch (error) {
      await this.rateLimiter.recordVerifyFailure(userId);
      this.handleAppwriteError(error, 'OTP verification failed');
    }

    await this.rateLimiter.resetVerifyLimit(userId);

    // Clean up the ephemeral OTP session and user — no longer needed after verification
    if (this.users && session) {
      try {
        await this.users.deleteSession({ userId, sessionId: session.$id });
      } catch { /* Non-fatal: session expires naturally */ }
      try {
        await this.users.delete({ userId });
      } catch { /* Non-fatal: user cleanup is best-effort */ }
    }

    return { success: true };
  }

  private validateEmail(email: string): void {
    if (!email || typeof email !== 'string') {
      throw new Error('Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  private validateUserId(userId: string): void {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid userId');
    }
  }

  private validateSecret(secret: string): void {
    if (!secret || typeof secret !== 'string') {
      throw new Error('Invalid OTP secret');
    }
  }

  private handleAppwriteError(error: unknown, message: string): never {
    if (error instanceof AppwriteException) {
      throw new Error(`${message}: ${error.message}`);
    }

    throw new Error(message);
  }
}
