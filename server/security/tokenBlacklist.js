/**
 * Token Blacklist / Revocation Store for JWTs
 * Supports in-memory revocation with automatic expiration cleanup.
 */

class TokenBlacklist {
  constructor() {
    this.blacklistedTokens = new Map(); // token -> expiresAt (timestamp in ms)

    // Automatically prune expired tokens every 10 minutes
    this.cleanupTimer = setInterval(() => {
      this.prune();
    }, 10 * 60 * 1000);

    // Prevent interval from keeping the process alive
    if (this.cleanupTimer.unref) {
      this.cleanupTimer.unref();
    }
  }

  /**
   * Add a token to the blacklist
   * @param {string} token 
   * @param {number} expiresInMs (optional, defaults to 7 days)
   */
  revoke(token, expiresInMs = 7 * 24 * 60 * 60 * 1000) {
    if (!token) return;
    const expiresAt = Date.now() + expiresInMs;
    this.blacklistedTokens.set(token, expiresAt);
  }

  /**
   * Check if a token is revoked/blacklisted
   * @param {string} token 
   * @returns {boolean}
   */
  isRevoked(token) {
    if (!token) return true;
    if (!this.blacklistedTokens.has(token)) return false;

    const expiresAt = this.blacklistedTokens.get(token);
    if (Date.now() > expiresAt) {
      this.blacklistedTokens.delete(token);
      return false;
    }
    return true;
  }

  /**
   * Prune expired revoked tokens
   */
  prune() {
    const now = Date.now();
    for (const [token, expiresAt] of this.blacklistedTokens.entries()) {
      if (now > expiresAt) {
        this.blacklistedTokens.delete(token);
      }
    }
  }

  /**
   * Clear all blacklisted tokens (testing helper)
   */
  clear() {
    this.blacklistedTokens.clear();
  }
}

const tokenBlacklist = new TokenBlacklist();
module.exports = tokenBlacklist;
