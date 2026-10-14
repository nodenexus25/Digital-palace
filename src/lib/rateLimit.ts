/**
 * In-memory token-bucket rate limiter keyed by an identifier (typically IP).
 * Each bucket starts with `max` tokens; one token is consumed per request and
 * refilled at `max / windowMs` per millisecond. Requests with no tokens left
 * are rejected. State is held in a Map; entries are lazily expired to avoid
 * unbounded growth.
 */
type Bucket = { tokens: number; lastRefill: number }

const buckets = new Map<string, Bucket>()

export interface RateLimitOptions {
  /** Maximum burst tokens. */
  max: number
  /** Window in milliseconds over which `max` tokens are available. */
  windowMs: number
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetMs: number
}

export function rateLimit(
  key: string,
  { max, windowMs }: RateLimitOptions,
): RateLimitResult {
  const now = Date.now()
  const bucket = buckets.get(key)
  const refillRate = max / windowMs

  if (!bucket) {
    buckets.set(key, { tokens: max - 1, lastRefill: now })
    return { allowed: true, remaining: max - 1, resetMs: windowMs }
  }

  const elapsed = now - bucket.lastRefill
  const refilled = elapsed * refillRate
  const tokens = Math.min(max, bucket.tokens + refilled)

  if (tokens < 1) {
    const needed = 1 - tokens
    const resetMs = Math.ceil(needed / refillRate)
    return { allowed: false, remaining: 0, resetMs }
  }

  bucket.tokens = tokens - 1
  bucket.lastRefill = now
  return { allowed: true, remaining: Math.floor(bucket.tokens), resetMs: windowMs }
}

/** Remove buckets that have been full (unused) for longer than the window. */
export function sweepRateLimit(windowMs: number): void {
  const now = Date.now()
  for (const [key, bucket] of buckets) {
    if (now - bucket.lastRefill > windowMs && bucket.tokens >= 1) {
      buckets.delete(key)
    }
  }
}
