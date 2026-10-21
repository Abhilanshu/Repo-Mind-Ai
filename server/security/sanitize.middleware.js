/**
 * Input Sanitization Middleware
 * Sanitizes payload strings, neutralizes XSS scripts, and strips NoSQL operator injections.
 */

// Characters/patterns commonly used in XSS attacks
const DANGEROUS_HTML_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>|<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>|javascript:[^"'\s]*|vbscript:[^"'\s]*|data:text\/html[^"'\s]*/gi;
const INLINE_EVENT_HANDLERS_REGEX = /\bon\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi;

/**
 * Sanitize a single string value:
 * 1. Strips null bytes (\0)
 * 2. Trims leading and trailing whitespace
 * 3. Strips malicious HTML script tags, iframes, and inline JS handlers
 * 4. Limits string length to prevent ReDoS / payload bombing
 */
function sanitizeString(value, maxLength = 10000) {
  if (typeof value !== 'string') return value;

  // 1. Remove null bytes
  let clean = value.replace(/\0/g, '');

  // 2. Enforce length cap
  if (clean.length > maxLength) {
    clean = clean.substring(0, maxLength);
  }

  // 3. Strip dangerous script injections
  clean = clean.replace(DANGEROUS_HTML_REGEX, '');
  clean = clean.replace(INLINE_EVENT_HANDLERS_REGEX, '');

  // 4. Trim whitespace
  return clean.trim();
}

/**
 * Deeply sanitize an object or array:
 * - Sanitizes all string values
 * - Detects and neutralizes NoSQL injection keys starting with '$' or containing '.'
 */
function sanitizeDeep(target, options = { stripNoSQL: true, rejectNoSQL: false, maxLength: 10000 }) {
  if (target === null || target === undefined) return target;

  if (typeof target === 'string') {
    return sanitizeString(target, options.maxLength);
  }

  if (Array.isArray(target)) {
    return target.map(item => sanitizeDeep(item, options));
  }

  if (typeof target === 'object' && target.constructor === Object) {
    const sanitizedObj = {};

    for (const [key, val] of Object.entries(target)) {
      // Check for NoSQL Injection operators (e.g. $gt, $ne, $where, or keys with dots)
      if (key.startsWith('$') || key.includes('.')) {
        if (options.rejectNoSQL) {
          const err = new Error(`Potential NoSQL Injection detected in key: '${key}'`);
          err.code = 'NOSQL_INJECTION_DETECTED';
          throw err;
        }
        // If stripping, skip dangerous keys
        continue;
      }

      // Recursively sanitize the value
      sanitizedObj[key] = sanitizeDeep(val, options);
    }

    return sanitizedObj;
  }

  return target;
}

/**
 * Express Middleware: Deeply sanitizes req.body, req.query, and req.params
 * @param {object} options
 * @param {boolean} [options.rejectNoSQL=true] When true, returns 400 immediately on NoSQL operator injection attempt
 * @param {number} [options.maxLength=10000] Maximum allowed string length
 */
function sanitizePayload(options = { rejectNoSQL: true, maxLength: 10000 }) {
  return (req, res, next) => {
    try {
      if (req.body && typeof req.body === 'object') {
        req.body = sanitizeDeep(req.body, options);
      }

      if (req.query && typeof req.query === 'object') {
        req.query = sanitizeDeep(req.query, options);
      }

      if (req.params && typeof req.params === 'object') {
        req.params = sanitizeDeep(req.params, options);
      }

      next();
    } catch (err) {
      if (err.code === 'NOSQL_INJECTION_DETECTED') {
        return res.status(400).json({
          error: 'Malicious Payload Rejected',
          code: 'NOSQL_INJECTION_DETECTED',
          message: 'The request payload contains restricted database query operators (e.g. $gt, $where).'
        });
      }
      return res.status(400).json({
        error: 'Sanitization Error',
        message: 'Invalid payload encoding or formatting.'
      });
    }
  };
}

module.exports = {
  sanitizeString,
  sanitizeDeep,
  sanitizePayload
};
