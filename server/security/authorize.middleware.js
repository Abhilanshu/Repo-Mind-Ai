/**
 * Authorization Middleware: Enforcing User Permissions & Resource Ownership
 * Protects against Unauthorized Actions & IDOR (Insecure Direct Object References).
 */

const { ROLES, hasPermission } = require('./permissions');

/**
 * Role-Based Access Control Guard
 * Requires the authenticated user to hold at least one of the specified roles.
 * @param {...string} allowedRoles 
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication Required',
        message: 'You must be authenticated to perform this operation.'
      });
    }

    // Admins always bypass role restrictions
    if (req.user.role === ROLES.ADMIN) {
      return next();
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Forbidden: Insufficient Role Privileges',
        code: 'ROLE_UNAUTHORIZED',
        message: `Your current role '${req.user.role}' lacks permission for this action. Required role: [${allowedRoles.join(', ')}].`
      });
    }

    return next();
  };
}

/**
 * Permission-Based Access Control Guard
 * Requires the authenticated user to possess all listed permissions.
 * @param {...string} requiredPermissions 
 */
function requirePermission(...requiredPermissions) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication Required',
        message: 'You must be authenticated to perform this operation.'
      });
    }

    // Admin has wildcard access
    if (req.user.role === ROLES.ADMIN || (req.user.permissions && req.user.permissions.includes('*'))) {
      return next();
    }

    const missingPermissions = requiredPermissions.filter(perm => 
      !hasPermission(req.user.permissions, perm)
    );

    if (missingPermissions.length > 0) {
      return res.status(403).json({
        error: 'Forbidden: Insufficient Permissions',
        code: 'PERMISSION_DENIED',
        missingPermissions,
        message: `Action denied. You lack the following permissions: ${missingPermissions.join(', ')}.`
      });
    }

    return next();
  };
}

/**
 * Resource Ownership & Tenancy Guard (IDOR Prevention)
 * Enforces that users can only view or mutate resources that they own or share within their organization.
 * 
 * @param {object} options
 * @param {function} options.getResource Async function (req) => Promise<resource|null>
 * @param {string} [options.ownerField='ownerId'] Property name storing user ownership ID
 * @param {string} [options.orgField='organizationId'] Property name storing tenant org ID
 * @param {boolean} [options.allowSameOrg=true] Whether colleagues in the same organization have read/write access
 * @param {boolean} [options.allowAdmin=true] Whether Admin role bypasses ownership checks
 */
function enforceOwnership(options) {
  const {
    getResource,
    ownerField = 'ownerId',
    orgField = 'organizationId',
    allowSameOrg = false,
    allowAdmin = true
  } = options;

  if (typeof getResource !== 'function') {
    throw new Error('enforceOwnership requires a getResource function.');
  }

  return async (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication Required',
        message: 'Identity verification required before resolving resource ownership.'
      });
    }

    try {
      const resource = await getResource(req);

      if (!resource) {
        return res.status(404).json({
          error: 'Resource Not Found',
          code: 'RESOURCE_NOT_FOUND',
          message: 'The requested resource does not exist or has been removed.'
        });
      }

      // Attach resource to request context so downstream handlers don't re-fetch
      req.resolvedResource = resource;

      // 1. Admin bypass check
      if (allowAdmin && req.user.role === ROLES.ADMIN) {
        req.isResourceAdminOverride = true;
        return next();
      }

      const resourceOwnerId = String(resource[ownerField] || resource.owner || '');
      const resourceOrgId = String(resource[orgField] || '');
      const currentUserId = String(req.user.id || req.user._id || '');
      const currentUserOrgId = String(req.user.organizationId || '');

      // 2. Direct user ownership match
      if (resourceOwnerId && resourceOwnerId === currentUserId) {
        req.isResourceOwner = true;
        return next();
      }

      // 3. Organization-level tenancy match
      if (allowSameOrg && resourceOrgId && resourceOrgId === currentUserOrgId) {
        req.isOrganizationMember = true;
        return next();
      }

      // 4. Access Denied (IDOR Blocked)
      return res.status(403).json({
        error: 'Forbidden: Resource Ownership Violation',
        code: 'OWNERSHIP_MISMATCH',
        message: 'Access Denied: You do not own this resource or possess cross-tenant authorization.'
      });
    } catch (err) {
      console.error('Resource ownership verification error:', err);
      return res.status(500).json({
        error: 'Ownership Check Failed',
        message: 'An internal error occurred while verifying resource ownership.'
      });
    }
  };
}

module.exports = {
  requireRole,
  requirePermission,
  enforceOwnership
};
