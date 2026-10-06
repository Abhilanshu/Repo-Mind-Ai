const mongoose = require('mongoose');

const RepositorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  branch: {
    type: String,
    default: 'main'
  },
  url: {
    type: String,
    required: true
  },
  totalFiles: {
    type: Number,
    default: 42
  },
  totalLoc: {
    type: Number,
    default: 8420
  },
  healthScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 87
  },
  healthBreakdown: {
    codeQuality: { type: Number, default: 90 },
    architecture: { type: Number, default: 89 },
    security: { type: Number, default: 92 },
    testing: { type: Number, default: 76 },
    dependencies: { type: Number, default: 81 },
    documentation: { type: Number, default: 85 }
  },
  totalIssues: {
    type: Number,
    default: 16
  },
  issuesBreakdown: {
    critical: { type: Number, default: 1 },
    high: { type: Number, default: 3 },
    medium: { type: Number, default: 7 },
    low: { type: Number, default: 5 }
  },
  totalDebtHours: {
    type: Number,
    default: 28
  },
  debtHoursTrendDelta: {
    type: Number,
    default: -14
  },
  aiSummary: {
    type: String,
    default: 'RepoMind parsed static AST complexity modules, supply chain vulnerabilities, and technical debt hours.'
  },
  repositoryType: {
    type: String,
    default: 'React / Node / MongoDB / Python'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Repository', RepositorySchema);
