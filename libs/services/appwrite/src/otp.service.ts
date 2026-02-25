import { ID, Account, AppwriteException } from "node-appwrite";
import { AppwriteRateLimiter } from "./otp-rate-limiter";

export class OtpService {
  constructor(
    private readonly account: Account,
    private readonly rateLimiter: AppwriteRateLimiter,
  ) {}

  async sendEmailToken(email: string): Promise<{ userId: string }> {
    this.validateEmail(email);

    await this.rateLimiter.checkSendCooldown(email);

    try {
      const result = await this.account.createEmailToken({
        userId: ID.unique(),
        email,
      });

      await this.rateLimiter.recordEmailSend(email);

      return { userId: result.userId };
    } catch (error) {
      this.handleAppwriteError(error, "Failed to send OTP email");
    }
  }

  async verifySession(
    userId: string,
    secret: string
  ): Promise<{ success: true }> {
    this.validateUserId(userId);
    this.validateSecret(secret);

    await this.rateLimiter.checkVerifyLimit(userId);

    try {
      await this.account.createSession({ userId, secret });

      await this.rateLimiter.resetVerifyLimit(userId);

      return { success: true };
    } catch (error) {
      await this.rateLimiter.recordVerifyFailure(userId);

      this.handleAppwriteError(error, "OTP verification failed");
    }
  }

  private validateEmail(email: string): void {
    if (!email || typeof email !== "string") {
      throw new Error("Email is required");
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  private validateUserId(userId: string): void {
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid userId");
    }
  }

  private validateSecret(secret: string): void {
    if (!secret || typeof secret !== "string") {
      throw new Error("Invalid OTP secret");
    }
  }

  private handleAppwriteError(
    error: unknown,
    message: string
  ): never {
    if (error instanceof AppwriteException) {
      throw new Error(`${message}: ${error.message}`);
    }

    throw new Error(message);
  }
}
