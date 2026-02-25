import { ID, Query, TablesDB } from 'node-appwrite';
import { appwriteConfig } from './appwrite-config';

const SEND_COOLDOWN_MS = 30_000;          // 30 seconds between sends
const MAX_VERIFY_ATTEMPTS = 5;
const VERIFY_WINDOW_MS = 15 * 60 * 1000; // 15-minute window

export type RateLimitError = Error & { retryAfterMs: number };

export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof Error && error.name === 'RateLimitError';
}

function createRateLimitError(retryAfterMs: number, message: string): RateLimitError {
  const err = new Error(message) as RateLimitError;
  err.name = 'RateLimitError';
  err.retryAfterMs = retryAfterMs;
  return err;
}


type RateLimitRow = {
  $id: string;
  key: string;
  count: number;
  window_start: number;
  locked_until: number | null;
  last_sent_at: number | null;
};

export class AppwriteRateLimiter {
  constructor(private readonly tablesDB: TablesDB) {}

  async checkSendCooldown(email: string): Promise<void> {
    const record = await this.getRecord(`send:${email}`);
    if (!record?.last_sent_at) return;

    const elapsed = Date.now() - record.last_sent_at;
    if (elapsed < SEND_COOLDOWN_MS) {
      const retryAfterMs = SEND_COOLDOWN_MS - elapsed;

      
      throw createRateLimitError(
        retryAfterMs,
        `Please wait ${Math.ceil(retryAfterMs / 1000)} seconds before requesting a new code.`,
      );
    }
  }

  async recordEmailSend(email: string): Promise<void> {
    await this.upsertRecord(`send:${email}`, {
      last_sent_at: Date.now(),
      count: 0,
      window_start: 0,
      locked_until: null,
    });
  }

  async checkVerifyLimit(userId: string): Promise<void> {
    const now = Date.now();
    const record = await this.getRecord(`verify:${userId}`);
    if (!record) return;

    if (record.locked_until && now < record.locked_until) {
      throw createRateLimitError(
        record.locked_until - now,
        `Too many failed attempts. Try again in ${Math.ceil((record.locked_until - now) / 60000)} minutes.`,
      );
    }

    if (now - record.window_start > VERIFY_WINDOW_MS) {
      await this.deleteRecord(`verify:${userId}`);
      return;
    }

    if (record.count >= MAX_VERIFY_ATTEMPTS) {
      const lockedUntil = record.window_start + VERIFY_WINDOW_MS;
      await this.upsertRecord(`verify:${userId}`, { ...record, locked_until: lockedUntil });
      throw createRateLimitError(
        lockedUntil - now,
        `Too many failed attempts. Try again in ${Math.ceil((lockedUntil - now) / 60000)} minutes.`,
      );
    }
  }

  async recordVerifyFailure(userId: string): Promise<void> {
    const now = Date.now();
    const record = await this.getRecord(`verify:${userId}`);

    if (!record || now - record.window_start > VERIFY_WINDOW_MS) {
      await this.upsertRecord(`verify:${userId}`, {
        count: 1,
        window_start: now,
        locked_until: null,
        last_sent_at: null,
      });
    } else {
      await this.upsertRecord(`verify:${userId}`, { ...record, count: record.count + 1 });
    }
  }

  async resetVerifyLimit(userId: string): Promise<void> {
    await this.deleteRecord(`verify:${userId}`);
  }

  private async getRecord(key: string): Promise<RateLimitRow | null> {
    const result = await this.tablesDB.listRows({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.otpRateLimitsCollectionId,
      queries: [Query.equal('key', [key])],
    });

    return (result.rows[0] as unknown as RateLimitRow) ?? null;
  }

  private async upsertRecord(
    key: string,
    data: Omit<RateLimitRow, '$id' | 'key'>,
  ): Promise<void> {
    const existing = await this.getRecord(key);

    if (existing) {
      await this.tablesDB.updateRow({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.otpRateLimitsCollectionId,
        rowId: existing.$id,
        data,
      });
    } else {
      await this.tablesDB.createRow({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.otpRateLimitsCollectionId,
        rowId: ID.unique(),
        data: { key, ...data },
      });
    }
  }

  private async deleteRecord(key: string): Promise<void> {
    const record = await this.getRecord(key);
    if (!record) return;

    await this.tablesDB.deleteRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.otpRateLimitsCollectionId,
      rowId: record.$id,
    });
  }
}
