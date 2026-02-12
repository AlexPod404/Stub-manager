export const cacheConfig = () => ({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  password: process.env.REDIS_PASSWORD || '',
  ttl: parseInt(process.env.CACHE_TTL, 10) || 3600, // 1 hour default for dead cache
  db: parseInt(process.env.REDIS_DB, 10) || 0,
});
