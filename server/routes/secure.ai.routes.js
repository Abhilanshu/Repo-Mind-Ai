/**
 * Secure AI Codebase Assistant Router
 * Enforces: Header/Token Authentication, 'ai:chat' Permission,
 * Strict Message Schema Validation, and Payload String Sanitization.
 */

const express = require('express');

const {
  authenticate,
  requirePermission,
  sanitizePayload,
  validateSchema,
  SCHEMAS,
  PERMISSIONS
} = require('../security');

const router = express.Router();

router.post(
  '/chat',
  authenticate,
  requirePermission(PERMISSIONS.AI_CHAT),
  sanitizePayload({ rejectNoSQL: true }),
  validateSchema({ body: SCHEMAS.aiChat, strict: true }),
  (req, res) => {
    const { message, context } = req.body;

    return res.json({
      status: 'success',
      authenticatedUser: {
        id: req.user.id,
        role: req.user.role
      },
      response: `I am **RepoMind Secure Code Agent**. I analyzed your sanitized query: "${message}". All authorization checks and schema boundaries verified cleanly.`,
      suggestedFix: "Refactor core module loop to eliminate high cyclomatic complexity and ensure parameterized queries.",
      contextProcessed: !!context
    });
  }
);

module.exports = router;
