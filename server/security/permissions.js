/**
 * Role-Based and Permission-Based Access Control Definitions for RepoMind AI
 */

const ROLES = {
  ADMIN: 'Admin',
  ENGINEERING_MANAGER: 'Engineering Manager',
  SENIOR_ARCHITECT: 'Senior Architect',
  SECURITY_SPECIALIST: 'Security Specialist',
  LEAD_ENGINEER: 'Lead Engineer',
  FULL_STACK_DEVELOPER: 'Full Stack Developer',
  DEVELOPER: 'Developer',
  VIEWER: 'Viewer'
};

const PERMISSIONS = {
  // Repository permissions
  REPO_READ: 'repo:read',
  REPO_CREATE: 'repo:create',
  REPO_UPDATE: 'repo:update',
  REPO_DELETE: 'repo:delete',
  REPO_ANALYZE: 'repo:analyze',

  // Technical Debt permissions
  DEBT_READ: 'debt:read',
  DEBT_CREATE: 'debt:create',
  DEBT_UPDATE: 'debt:update',
  DEBT_DELETE: 'debt:delete',
  DEBT_RESOLVE: 'debt:resolve',

  // Security Finding permissions
  SECURITY_READ: 'security:read',
  SECURITY_RESOLVE: 'security:resolve',
  SECURITY_EXPORT: 'security:export',

  // Notifications & integrations
  NOTIFICATION_SEND: 'notification:send',
  NOTIFICATION_CONFIG: 'notification:config',

  // AI & Assistant
  AI_CHAT: 'ai:chat',

  // Reports
  REPORT_GENERATE: 'report:generate',

  // User & Administrative management
  USER_MANAGE: 'user:manage',
  ORG_MANAGE: 'org:manage',
  ALL: '*'
};

// Role to permissions mapping
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.ALL
  ],
  [ROLES.ENGINEERING_MANAGER]: [
    PERMISSIONS.REPO_READ,
    PERMISSIONS.REPO_CREATE,
    PERMISSIONS.REPO_UPDATE,
    PERMISSIONS.REPO_ANALYZE,
    PERMISSIONS.DEBT_READ,
    PERMISSIONS.DEBT_UPDATE,
    PERMISSIONS.DEBT_RESOLVE,
    PERMISSIONS.SECURITY_READ,
    PERMISSIONS.NOTIFICATION_SEND,
    PERMISSIONS.NOTIFICATION_CONFIG,
    PERMISSIONS.REPORT_GENERATE,
    PERMISSIONS.AI_CHAT
  ],
  [ROLES.SENIOR_ARCHITECT]: [
    PERMISSIONS.REPO_READ,
    PERMISSIONS.REPO_CREATE,
    PERMISSIONS.REPO_UPDATE,
    PERMISSIONS.REPO_ANALYZE,
    PERMISSIONS.DEBT_READ,
    PERMISSIONS.DEBT_UPDATE,
    PERMISSIONS.DEBT_RESOLVE,
    PERMISSIONS.SECURITY_READ,
    PERMISSIONS.SECURITY_RESOLVE,
    PERMISSIONS.NOTIFICATION_SEND,
    PERMISSIONS.REPORT_GENERATE,
    PERMISSIONS.AI_CHAT
  ],
  [ROLES.SECURITY_SPECIALIST]: [
    PERMISSIONS.REPO_READ,
    PERMISSIONS.SECURITY_READ,
    PERMISSIONS.SECURITY_RESOLVE,
    PERMISSIONS.SECURITY_EXPORT,
    PERMISSIONS.DEBT_READ,
    PERMISSIONS.REPORT_GENERATE,
    PERMISSIONS.AI_CHAT
  ],
  [ROLES.LEAD_ENGINEER]: [
    PERMISSIONS.REPO_READ,
    PERMISSIONS.REPO_CREATE,
    PERMISSIONS.REPO_ANALYZE,
    PERMISSIONS.DEBT_READ,
    PERMISSIONS.DEBT_UPDATE,
    PERMISSIONS.AI_CHAT,
    PERMISSIONS.REPORT_GENERATE
  ],
  [ROLES.FULL_STACK_DEVELOPER]: [
    PERMISSIONS.REPO_READ,
    PERMISSIONS.REPO_ANALYZE,
    PERMISSIONS.DEBT_READ,
    PERMISSIONS.DEBT_UPDATE,
    PERMISSIONS.AI_CHAT
  ],
  [ROLES.DEVELOPER]: [
    PERMISSIONS.REPO_READ,
    PERMISSIONS.REPO_ANALYZE,
    PERMISSIONS.DEBT_READ,
    PERMISSIONS.AI_CHAT
  ],
  [ROLES.VIEWER]: [
    PERMISSIONS.REPO_READ,
    PERMISSIONS.DEBT_READ,
    PERMISSIONS.SECURITY_READ
  ]
};

/**
 * Get all permissions granted to a specific role
 */
function getPermissionsForRole(role) {
  if (!role) return ROLE_PERMISSIONS[ROLES.VIEWER];
  return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS[ROLES.VIEWER];
}

/**
 * Check if a permission set satisfies required permission
 */
function hasPermission(userPermissions, requiredPermission) {
  if (!Array.isArray(userPermissions)) return false;
  if (userPermissions.includes(PERMISSIONS.ALL)) return true;
  return userPermissions.includes(requiredPermission);
}

module.exports = {
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  getPermissionsForRole,
  hasPermission
};
