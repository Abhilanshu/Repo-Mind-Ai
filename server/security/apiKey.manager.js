/**
 * API Key Identity Manager for Machine-to-Machine & CI/CD Integrations
 * Implements constant-time timing-safe comparisons to prevent timing attacks.
 */

const crypto = require('crypto');
const { ROLES, getPermissionsForRole } = require('./permissions');

class ApiKeyManager {
  constructor() {
    this.apiKeys = new Map();

    // Seed default internal integration API keys
    this.registerApiKey({
      key: process.env.REPOMIND_ADMIN_API_KEY || 'repomind_live_admin_secret_key_9871234987',
      name: 'RepoMind Admin Integration Key',
      ownerId: 'usr_admin_system',
      organizationId: 'org_repomind_main',
      role: ROLES.ADMIN,
      permissions: getPermissionsForRole(ROLES.ADMIN)
    });

    this.registerApiKey({
      key: process.env.REPOMIND_CI_API_KEY || 'repomind_live_ci_scanner_key_1234567890',
      name: 'GitHub Actions CI Scanner Key',
      ownerId: 'usr_ci_scanner',
      organizationId: 'org_repomind_main',
      role: ROLES.LEAD_ENGINEER,
      permissions: getPermissionsForRole(ROLES.LEAD_ENGINEER)
    });
  }

  /**
   * Register a new API key
   */
  registerApiKey({ key, name, ownerId, organizationId, role, permissions }) {
    if (!key || typeof key !== 'string') {
      throw new Error('Valid string key is required.');
    }
    const keyData = {
      key,
      name: name || 'API Key',
      ownerId: ownerId || 'usr_anonymous_api',
      organizationId: organizationId || 'org_repomind_main',
      role: role || ROLES.DEVELOPER,
      permissions: permissions || getPermissionsForRole(role || ROLES.DEVELOPER),
      createdAt: new Date().toISOString()
    };
    this.apiKeys.set(key, keyData);
    return keyData;
  }

  /**
   * Generate and register a random high-entropy API key
   */
  generateApiKey(options = {}) {
    const randomHex = crypto.randomBytes(32).toString('hex');
    const key = `repomind_ak_${randomHex}`;
    return this.registerApiKey({ key, ...options });
  }

  /**
   * Verify an API key with constant-time comparison
   * @param {string} incomingKey 
   * @returns {object|null}
   */
  verifyApiKey(incomingKey) {
    if (!incomingKey || typeof incomingKey !== 'string') return null;

    const incomingBuffer = Buffer.from(incomingKey);

    for (const [registeredKey, meta] of this.apiKeys.entries()) {
      const registeredBuffer = Buffer.from(registeredKey);
      if (incomingBuffer.length === registeredBuffer.length) {
        if (crypto.timingSafeEqual(incomingBuffer, registeredBuffer)) {
          return {
            id: meta.ownerId,
            _id: meta.ownerId,
            name: meta.name,
            role: meta.role,
            organizationId: meta.organizationId,
            permissions: meta.permissions,
            authType: 'api_key',
            isServiceAccount: true
          };
        }
      }
    }

    return null;
  }

  /**
   * Revoke an API key
   */
  revokeApiKey(key) {
    return this.apiKeys.delete(key);
  }
}

const apiKeyManager = new ApiKeyManager();
module.exports = apiKeyManager;
