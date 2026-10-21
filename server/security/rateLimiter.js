/**
 * Lightweight In-Memory Rate Limiter Middleware
 * Protects sensitive endpoints against brute-force attacks, credential stuffing, and DoS.
 */

class MemoryRateLimiter {
  constructor(windowMs = 15 * 60 * 1000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.hits = new Map(); // key -> { count, resetTime }

    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, windowMs);

    if (this.cleanupTimer.unref) {
      this.cleanupTimer.unref();
    }
  }

  cleanup() {
    const now = Date.now();
    for (const [key, data] of this.hits.entries()) {
      if (now > data.resetTime) {
        this.hits.delete(key);
      }
    }
  }

  middleware(customMax = this.maxRequests, message = 'Too many requests. Please try again later.') {
    return (req, res, next) => {
      const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
      const key = `${clientIp}:${req.baseUrl || ''}${req.path}`;
      const now = Date.now();

      let record = this.hits.get(key);
      if (!record || now > record.resetTime) {
        record = { count: 1, resetTime: now + this.windowMs };
        this.hits.set(key, record);
      } else {
        record.count += 1;
      }

      res.setHeader('X-RateLimit-Limit', customMax);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, customMax - record.count));
      res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));

      if (record.count > customMax) {
        return res.status(429).json({
          error: 'Rate Limit Exceeded',
          code: 'TOO_MANY_REQUESTS',
          message,
          retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000)
        });
      }

      next();
    };
  }
}

// Preconfigured rate limiters
const authLimiter = new MemoryRateLimiter(15 * 60 * 1000, 20); // 20 attempts per 15 mins for login/register
const apiLimiter = new MemoryRateLimiter(60 * 1000, 120); // 120 requests per minute for standard API

module.exports = {
  MemoryRateLimiter,
  authLimiter: authLimiter.middleware(20, 'Too many authentication attempts. Please wait 15 minutes before retrying.'),
  apiLimiter: apiLimiter.middleware(120, 'API rate limit exceeded. Please throttle requests.')
};
