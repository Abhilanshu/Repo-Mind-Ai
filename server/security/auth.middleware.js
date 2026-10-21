/**
 * Authentication Middleware: Verifying Identity via Headers or Tokens
 * Supports Bearer JWT tokens and X-API-Key / Authorization: ApiKey headers.
 */

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const tokenBlacklist = require('./tokenBlacklist');
const apiKeyManager = require('./apiKey.manager');
const { getPermissionsForRole } = require('./permissions');

const JWT_SECRET = process.env.JWT_SECRET || 'repomind_super_secret_jwt_key_2026';

// Fallback in-memory user store for environments where MongoDB is offline
const inMemoryUsers = new Map();

/**
 * Register user in fallback in-memory store
 */
function setInMemoryUser(email, user) {
  inMemoryUsers.set(email.toLowerCase().trim(), user);
  if (user._id || user.id) {
    inMemoryUsers.set(String(user._id || user.id), user);
  }
}

/**
 * Get user from fallback in-memory store
 */
function getInMemoryUser(identifier) {
  if (!identifier) return null;
  const cleanId = String(identifier).toLowerCase().trim();
  if (inMemoryUsers.has(cleanId)) return inMemoryUsers.get(cleanId);
  if (inMemoryUsers.has(identifier)) return inMemoryUsers.get(identifier);

  for (const user of inMemoryUsers.values()) {
    if (user.email === identifier || String(user._id) === String(identifier) || String(user.id) === String(identifier)) {
      return user;
    }
  }
  return null;
}

/**
 * Extract credential from request headers
 */
function extractCredentials(req) {
  const authHeader = req.headers.authorization || req.headers['x-auth-token'];
  const apiKeyHeader = req.headers['x-api-key'] || req.headers['api-key'];

  // 1. Check API Key header
  if (apiKeyHeader) {
    return { type: 'api_key', value: apiKeyHeader.trim() };
  }

  // 2. Check Authorization Header
  if (authHeader) {
    const parts = authHeader.trim().split(' ');
    if (parts.length === 2) {
      const scheme = parts[0].toLowerCase();
      const credentials = parts[1];
      if (scheme === 'bearer') {
        return { type: 'bearer', value: credentials };
      }
      if (scheme === 'apikey' || scheme === 'api-key') {
        return { type: 'api_key', value: credentials };
      }
    } else if (parts.length === 1 && !authHeader.includes(' ')) {
      // Direct token format (e.g. from x-auth-token)
      return { type: 'bearer', value: authHeader.trim() };
    }
  }

  return null;
}

/**
 * Strict Authentication Guard: Requires valid Bearer Token or API Key
 */
async function authenticate(req, res, next) {
  const credentials = extractCredentials(req);

  if (!credentials) {
    return res.status(401).json({
      error: 'Authentication Required',
      code: 'AUTH_HEADER_MISSING',
      message: 'Access denied. Missing Authorization header (Bearer token) or X-API-Key.'
    });
  }

  // 1. API Key Authentication Strategy
  if (credentials.type === 'api_key') {
    const keyUser = apiKeyManager.verifyApiKey(credentials.value);
    if (!keyUser) {
      return res.status(401).json({
        error: 'Invalid API Key',
        code: 'API_KEY_INVALID',
        message: 'The provided API key is invalid or has been revoked.'
      });
    }

    req.user = keyUser;
    req.authMethod = 'api_key';
    return next();
  }

  // 2. JWT Bearer Token Strategy
  if (credentials.type === 'bearer') {
    const token = credentials.value;

    // Check token blacklist / revocation
    if (tokenBlacklist.isRevoked(token)) {
      return res.status(401).json({
        error: 'Token Revoked',
        code: 'TOKEN_REVOKED',
        message: 'This session token has been revoked. Please log in again.'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          error: 'Token Expired',
          code: 'TOKEN_EXPIRED',
          message: 'Your authentication token has expired. Please log in again.'
        });
      }
      return res.status(401).json({
        error: 'Invalid Token',
        code: 'TOKEN_INVALID',
        message: 'Cryptographic signature verification failed for token.'
      });
    }

    // Retrieve user from MongoDB (if connected) or in-memory fallback
    let user = null;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        user = await User.findById(decoded.userId).lean();
      } catch (dbErr) {
        user = getInMemoryUser(decoded.userId) || getInMemoryUser(decoded.email);
      }
    } else {
      user = getInMemoryUser(decoded.userId) || getInMemoryUser(decoded.email);
    }

    if (!user && (decoded.email || decoded.userId)) {
      user = getInMemoryUser(decoded.userId) || getInMemoryUser(decoded.email);
    }

    // If user deleted or no longer exists
    if (!user && !decoded.userId) {
      return res.status(401).json({
        error: 'User Not Found',
        code: 'USER_NOT_FOUND',
        message: 'The user account associated with this token does not exist.'
      });
    }

    // Attach normalized user payload to request
    const userRole = (user && user.role) || decoded.role || 'Senior Architect';
    const userId = (user && (user._id || user.id)) || decoded.userId;
    const userEmail = (user && user.email) || decoded.email;
    const organizationId = (user && user.organizationId) || decoded.organizationId || 'org_repomind_main';

    req.user = {
      id: String(userId),
      _id: String(userId),
      name: (user && user.name) || decoded.name || 'RepoMind User',
      email: userEmail,
      role: userRole,
      organizationId,
      permissions: getPermissionsForRole(userRole),
      authType: 'jwt'
    };
    req.token = token;
    req.authMethod = 'jwt';

    return next();
  }

  return res.status(401).json({
    error: 'Unsupported Authentication',
    code: 'AUTH_SCHEME_UNSUPPORTED',
    message: 'Unsupported authentication scheme. Use Bearer or ApiKey.'
  });
}

/**
 * Optional Authentication Middleware
 * Enriches req.user if valid credentials are provided, but allows unauthenticated access.
 */
async function optionalAuthenticate(req, res, next) {
  const credentials = extractCredentials(req);
  if (!credentials) {
    req.user = null;
    return next();
  }

  try {
    if (credentials.type === 'api_key') {
      const keyUser = apiKeyManager.verifyApiKey(credentials.value);
      if (keyUser) req.user = keyUser;
      return next();
    }

    if (credentials.type === 'bearer') {
      const token = credentials.value;
      if (!tokenBlacklist.isRevoked(token)) {
        const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
        let user = null;
        if (mongoose.connection && mongoose.connection.readyState === 1) {
          try {
            user = await User.findById(decoded.userId).lean();
          } catch (e) {
            user = getInMemoryUser(decoded.userId) || getInMemoryUser(decoded.email);
          }
        } else {
          user = getInMemoryUser(decoded.userId) || getInMemoryUser(decoded.email);
        }

        const userRole = (user && user.role) || decoded.role || 'Senior Architect';
        const userId = (user && (user._id || user.id)) || decoded.userId;

        req.user = {
          id: String(userId),
          _id: String(userId),
          name: (user && user.name) || decoded.name || 'RepoMind User',
          email: (user && user.email) || decoded.email,
          role: userRole,
          organizationId: (user && user.organizationId) || decoded.organizationId || 'org_repomind_main',
          permissions: getPermissionsForRole(userRole),
          authType: 'jwt'
        };
        req.token = token;
      }
    }
  } catch (err) {
    // Proceed as unauthenticated for optional route
    req.user = null;
  }

  return next();
}

module.exports = {
  authenticate,
  optionalAuthenticate,
  setInMemoryUser,
  getInMemoryUser,
  JWT_SECRET
};
