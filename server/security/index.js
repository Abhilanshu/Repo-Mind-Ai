/**
 * Central Security Suite for RepoMind AI
 * Exports authentication, authorization, sanitization, schema validation, and rate limiting.
 */

const { authenticate, optionalAuthenticate, setInMemoryUser, getInMemoryUser, JWT_SECRET } = require('./auth.middleware');
const { requireRole, requirePermission, enforceOwnership } = require('./authorize.middleware');
const { sanitizePayload, sanitizeString, sanitizeDeep } = require('./sanitize.middleware');
const { validateSchema, validateObject } = require('./validate.middleware');
const { ROLES, PERMISSIONS, getPermissionsForRole, hasPermission } = require('./permissions');
const tokenBlacklist = require('./tokenBlacklist');
const apiKeyManager = require('./apiKey.manager');
const { authLimiter, apiLimiter } = require('./rateLimiter');
const SCHEMAS = require('./schemas');

module.exports = {
  // Authentication
  authenticate,
  optionalAuthenticate,
  setInMemoryUser,
  getInMemoryUser,
  JWT_SECRET,
  apiKeyManager,
  tokenBlacklist,

  // Authorization
  requireRole,
  requirePermission,
  enforceOwnership,
  ROLES,
  PERMISSIONS,
  getPermissionsForRole,
  hasPermission,

  // Input Validation & Sanitization
  sanitizePayload,
  sanitizeString,
  sanitizeDeep,
  validateSchema,
  validateObject,
  SCHEMAS,

  // Rate Limiting
  authLimiter,
  apiLimiter
};
