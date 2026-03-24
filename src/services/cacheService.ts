// Mock implementation of Redis Client
// In production, this would import 'ioredis'
// import Redis from 'ioredis';

// Placeholder for type safety without installing ioredis
interface RedisClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, mode?: string, duration?: number): Promise<'OK' | null>;
  del(keys: string[]): Promise<number>;
  keys(pattern: string): Promise<string[]>;
}

// Singleton Pattern
class CacheService {
  private client: RedisClient | null = null;
  private isEnabled = false;

  constructor() {
    if (process.env.REDIS_URL) {
      // this.client = new Redis(process.env.REDIS_URL);
      // this.isEnabled = true;
      console.log('Redis Cache Initialized (Mock)');
    }
  }

  /**
   * Cache-Aside Implementation
   * @param key Cache Key
   * @param fetchFn Function to fetch data if cache miss
   * @param ttlSeconds Time to live in seconds
   */
  async getOrSet<T>(key: string, fetchFn: () => Promise<T>, ttlSeconds: number = 3600): Promise<T> {
    if (!this.isEnabled || !this.client) {
      return await fetchFn();
    }

    try {
      // 1. Check Cache
      const cached = await this.client.get(key);
      if (cached) {
        return JSON.parse(cached);
      }

      // 2. Fetch Data
      const data = await fetchFn();

      // 3. Set Cache (Non-blocking)
      if (data) {
        this.client.set(key, JSON.stringify(data), 'EX', ttlSeconds).catch(err => {
          console.error('Redis Set Error:', err);
        });
      }

      return data;
    } catch (err) {
      console.error('Redis Error:', err);
      // Fallback to source
      return await fetchFn();
    }
  }

  /**
   * Invalidate cache keys by pattern
   * @param pattern e.g., "dynasty:*"
   */
  async invalidate(pattern: string): Promise<void> {
    if (!this.isEnabled || !this.client) return;

    try {
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (err) {
      console.error('Redis Invalidate Error:', err);
    }
  }

  /**
   * Invalidate specific key
   */
  async del(key: string): Promise<void> {
    if (!this.isEnabled || !this.client) return;
    try {
      await this.client.del([key]);
    } catch (err) {
      console.error('Redis Del Error:', err);
    }
  }
}

export const cacheService = new CacheService();
