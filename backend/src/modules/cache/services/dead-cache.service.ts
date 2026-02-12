import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { cacheConfig } from '../../../config/cache.config';

@Injectable()
export class DeadCacheService implements OnModuleInit {
  private client: RedisClientType;
  private config = cacheConfig();

  async onModuleInit() {
    this.client = createClient({
      socket: {
        host: this.config.host,
        port: this.config.port,
      },
      password: this.config.password || undefined,
      database: this.config.db,
    });

    this.client.on('error', (err) => {
      console.error('Redis Client Error', err);
    });

    await this.client.connect();
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      const expiresIn = ttl || this.config.ttl;
      await this.client.setEx(key, expiresIn, serialized);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await this.client.exists(key);
      return result === 1;
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  }

  /**
   * Dead cache implementation:
   * When DB connection is lost, continue working with cached data
   * for configured TTL period (default: 1 hour)
   */
  async getWithFallback<T>(
    key: string,
    fallbackFn: () => Promise<T>,
  ): Promise<T> {
    // Try to get from cache first
    const cached = await this.get<T>(key);
    if (cached) {
      return cached;
    }

    // Try to fetch from source
    try {
      const value = await fallbackFn();
      await this.set(key, value);
      return value;
    } catch (error) {
      // If fetch fails, try to get from cache with extended TTL
      const cachedValue = await this.get<T>(key);
      if (cachedValue) {
        console.warn('Using dead cache for key:', key);
        return cachedValue;
      }
      throw error;
    }
  }
}
