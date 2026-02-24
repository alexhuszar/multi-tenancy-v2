const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

type AttemptRecord = {
  count: number;
  windowStart: number;
  lockedUntil?: number;
};

const store = new Map<string, AttemptRecord>();

export type RateLimitError = Error & { retryAfterMs: number };

export function createRateLimitError(retryAfterMs: number): RateLimitError {
  const err = new Error(
    `Too many failed attempts. Try again in ${Math.ceil(retryAfterMs / 60000)} minutes.`,
  ) as RateLimitError;
  err.name = 'RateLimitError';
  err.retryAfterMs = retryAfterMs;
  return err;
}

export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof Error && error.name === 'RateLimitError';
}

export function checkOtpRateLimit(userId: string): void {
  const now = Date.now();
  const record = store.get(userId);

  if (!record) return;

  if (record.lockedUntil && now < record.lockedUntil) {
    throw createRateLimitError(record.lockedUntil - now);
  }

  if (now - record.windowStart > WINDOW_MS) {
    store.delete(userId);
    return;
  }

  if (record.count >= MAX_ATTEMPTS) {
    const lockedUntil = record.windowStart + WINDOW_MS;
    
    store.set(userId, { ...record, lockedUntil });
    
    throw createRateLimitError(lockedUntil - now);
  }
}

export function recordOtpFailure(userId: string): void {
  const now = Date.now();
  const existing = store.get(userId);

  if (!existing || now - existing.windowStart > WINDOW_MS) {
    store.set(userId, { count: 1, windowStart: now });
  } else {
    store.set(userId, { ...existing, count: existing.count + 1 });
  }
}

export function resetOtpRateLimit(userId: string): void {
  store.delete(userId);
}
