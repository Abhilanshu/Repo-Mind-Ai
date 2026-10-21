/**
 * Schema Validation Middleware Engine
 * Enforces strict payload schemas, disallows unknown parameters, and validates field constraints.
 */

// Common regular expression validators
const REGEX_PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  E164_PHONE: /^\+?[1-9]\d{7,14}$/,
  REPO_NAME: /^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$|^[a-zA-Z0-9._-]+$/,
  GIT_URL: /^(https?:\/\/|git@)([a-zA-Z0-9.-]+)[:/]([a-zA-Z0-9._/-]+)(\.git)?$/
};

/**
 * Validate a single value against a field specification
 */
function validateField(val, spec, fieldName) {
  // 1. Check required
  if (val === undefined || val === null || val === '') {
    if (spec.required) {
      return `'${fieldName}' is required.`;
    }
    return null; // optional & omitted
  }

  // 2. Type validation
  switch (spec.type) {
    case 'string':
      if (typeof val !== 'string') return `'${fieldName}' must be a string.`;
      if (spec.minLength !== undefined && val.length < spec.minLength) {
        return `'${fieldName}' must be at least ${spec.minLength} characters.`;
      }
      if (spec.maxLength !== undefined && val.length > spec.maxLength) {
        return `'${fieldName}' must be at most ${spec.maxLength} characters.`;
      }
      if (spec.pattern && !spec.pattern.test(val)) {
        return spec.patternMessage || `'${fieldName}' has an invalid format.`;
      }
      if (spec.enum && !spec.enum.includes(val)) {
        return `'${fieldName}' must be one of: [${spec.enum.join(', ')}].`;
      }
      break;

    case 'email':
      if (typeof val !== 'string' || !REGEX_PATTERNS.EMAIL.test(val.trim())) {
        return `'${fieldName}' must be a valid email address.`;
      }
      break;

    case 'url':
      if (typeof val !== 'string' || (!REGEX_PATTERNS.URL.test(val.trim()) && !REGEX_PATTERNS.GIT_URL.test(val.trim()))) {
        return `'${fieldName}' must be a valid URL or Git repository reference.`;
      }
      break;

    case 'phone':
    case 'e164_phone':
      const digitsOnly = typeof val === 'string' ? val.replace(/[\s\-()]/g, '') : '';
      if (!REGEX_PATTERNS.E164_PHONE.test(digitsOnly)) {
        return `'${fieldName}' must be a valid international telephone number with country code (e.g. +1234567890 or +919876543210).`;
      }
      break;

    case 'repo_name':
      if (typeof val !== 'string' || !REGEX_PATTERNS.REPO_NAME.test(val.trim())) {
        return `'${fieldName}' must be a valid repository name or slug (e.g., 'owner/repository').`;
      }
      break;

    case 'number':
      const num = Number(val);
      if (isNaN(num)) return `'${fieldName}' must be a numeric value.`;
      if (spec.min !== undefined && num < spec.min) return `'${fieldName}' must be >= ${spec.min}.`;
      if (spec.max !== undefined && num > spec.max) return `'${fieldName}' must be <= ${spec.max}.`;
      break;

    case 'boolean':
      if (typeof val !== 'boolean' && val !== 'true' && val !== 'false') {
        return `'${fieldName}' must be a boolean (true or false).`;
      }
      break;

    case 'array':
      if (!Array.isArray(val)) return `'${fieldName}' must be an array.`;
      if (spec.minItems !== undefined && val.length < spec.minItems) {
        return `'${fieldName}' must contain at least ${spec.minItems} items.`;
      }
      if (spec.maxItems !== undefined && val.length > spec.maxItems) {
        return `'${fieldName}' must contain at most ${spec.maxItems} items.`;
      }
      break;

    case 'object':
      if (typeof val !== 'object' || val === null || Array.isArray(val)) {
        return `'${fieldName}' must be an object.`;
      }
      break;
  }

  return null;
}

/**
 * Validate an object against a schema definition
 * @param {object} target Object to validate
 * @param {object} schema Spec defining allowed keys & rules
 * @param {boolean} strict Disallow unknown keys
 */
function validateObject(target = {}, schema = {}, strict = true) {
  const errors = [];
  const sanitizedTarget = {};

  // Check for unknown keys if strict schema enforcement is enabled
  if (strict) {
    const allowedKeys = new Set(Object.keys(schema));
    for (const key of Object.keys(target)) {
      if (!allowedKeys.has(key)) {
        errors.push({
          field: key,
          message: `Unknown parameter '${key}' is not permitted by schema.`
        });
      }
    }
  }

  // Validate all schema fields
  for (const [fieldName, spec] of Object.entries(schema)) {
    let val = target[fieldName];

    // Apply default value if missing
    if (val === undefined && spec.default !== undefined) {
      val = typeof spec.default === 'function' ? spec.default() : spec.default;
    }

    const fieldError = validateField(val, spec, fieldName);
    if (fieldError) {
      errors.push({ field: fieldName, message: fieldError });
    } else if (val !== undefined) {
      sanitizedTarget[fieldName] = val;
    }
  }

  return { isValid: errors.length === 0, errors, data: sanitizedTarget };
}

/**
 * Middleware generator: Validate request parts (body, query, params) against schemas
 * @param {object} config
 * @param {object} [config.body] Schema for req.body
 * @param {object} [config.query] Schema for req.query
 * @param {object} [config.params] Schema for req.params
 * @param {boolean} [config.strict=true] Reject unexpected fields
 */
function validateSchema(config = {}) {
  const { body: bodySchema, query: querySchema, params: paramsSchema, strict = true } = config;

  return (req, res, next) => {
    const allErrors = [];

    // 1. Validate Body
    if (bodySchema) {
      const result = validateObject(req.body || {}, bodySchema, strict);
      if (!result.isValid) {
        allErrors.push(...result.errors.map(e => ({ location: 'body', ...e })));
      } else {
        req.validatedBody = result.data;
      }
    }

    // 2. Validate Query
    if (querySchema) {
      const result = validateObject(req.query || {}, querySchema, strict);
      if (!result.isValid) {
        allErrors.push(...result.errors.map(e => ({ location: 'query', ...e })));
      } else {
        req.validatedQuery = result.data;
      }
    }

    // 3. Validate Route Params
    if (paramsSchema) {
      const result = validateObject(req.params || {}, paramsSchema, strict);
      if (!result.isValid) {
        allErrors.push(...result.errors.map(e => ({ location: 'params', ...e })));
      } else {
        req.validatedParams = result.data;
      }
    }

    if (allErrors.length > 0) {
      return res.status(400).json({
        error: 'Input Validation Failed',
        code: 'SCHEMA_VALIDATION_ERROR',
        details: allErrors
      });
    }

    next();
  };
}

module.exports = {
  validateSchema,
  validateObject,
  REGEX_PATTERNS
};
