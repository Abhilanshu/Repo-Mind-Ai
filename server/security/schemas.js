/**
 * Comprehensive Validation Schemas for RepoMind AI
 * Enforces strict boundaries, type constraints, allowed enums, and lengths.
 */

const { ROLES } = require('./permissions');

const SCHEMAS = {
  // 1. User Authentication: Registration
  register: {
    name: {
      type: 'string',
      required: true,
      minLength: 2,
      maxLength: 70
    },
    email: {
      type: 'email',
      required: true,
      maxLength: 120
    },
    password: {
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 128,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      patternMessage: "'password' must be at least 8 characters and include uppercase, lowercase, and a number."
    },
    role: {
      type: 'string',
      required: false,
      enum: Object.values(ROLES),
      default: ROLES.SENIOR_ARCHITECT
    },
    plan: {
      type: 'string',
      required: false,
      enum: ['Free', 'Starter', 'Pro Plan', 'Enterprise'],
      default: 'Pro Plan'
    },
    phoneNumber: {
      type: 'phone',
      required: false,
      default: '+919876543210'
    }
  },

  // 2. User Authentication: Login
  login: {
    email: {
      type: 'email',
      required: true,
      maxLength: 120
    },
    password: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 128
    }
  },

  // 3. Repository Analysis
  analyzeRepository: {
    url: {
      type: 'string',
      required: true,
      minLength: 3,
      maxLength: 255
    },
    branch: {
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 60,
      default: 'main',
      pattern: /^[a-zA-Z0-9._/-]+$/,
      patternMessage: "'branch' contains invalid characters. Use alphanumeric characters, hyphens, slashes, or underscores."
    },
    depth: {
      type: 'number',
      required: false,
      min: 1,
      max: 1000,
      default: 50
    }
  },

  // 4. Create Repository Metadata
  createRepository: {
    name: {
      type: 'repo_name',
      required: true,
      minLength: 3,
      maxLength: 100
    },
    url: {
      type: 'url',
      required: true,
      maxLength: 255
    },
    branch: {
      type: 'string',
      required: false,
      minLength: 1,
      maxLength: 50,
      default: 'main'
    },
    visibility: {
      type: 'string',
      required: false,
      enum: ['private', 'organization', 'public'],
      default: 'private'
    }
  },

  // 5. Technical Debt Issue Modification
  updateDebtIssue: {
    status: {
      type: 'string',
      required: false,
      enum: ['open', 'in_progress', 'resolved', 'ignored']
    },
    effortHours: {
      type: 'number',
      required: false,
      min: 0.1,
      max: 500
    },
    recommendation: {
      type: 'string',
      required: false,
      minLength: 5,
      maxLength: 1000
    }
  },

  // 6. WhatsApp Dispatch Alert
  sendWhatsApp: {
    phone: {
      type: 'phone',
      required: true
    },
    message: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 1000
    },
    apiKey: {
      type: 'string',
      required: false,
      maxLength: 128,
      default: ''
    }
  },

  // 7. AI Codebase Assistant
  aiChat: {
    message: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 2000
    },
    context: {
      type: 'string',
      required: false,
      maxLength: 5000,
      default: ''
    }
  },

  // 8. Safe Route Identifier Parameter
  idParam: {
    id: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 100,
      pattern: /^[a-zA-Z0-9_\-\.:]+$/,
      patternMessage: "'id' may only contain alphanumeric characters, underscores, hyphens, and colons."
    }
  }
};

module.exports = SCHEMAS;
