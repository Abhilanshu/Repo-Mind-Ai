const mongoose = require('mongoose');

const TechnicalDebtIssueSchema = new mongoose.Schema({
  issueId: {
    type: String,
    required: true,
    unique: true
  },
  repoName: {
    type: String,
    required: true,
    default: 'RepoMind Demo Store'
  },
  title: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['critical', 'high', 'medium', 'low'],
    required: true
  },
  category: {
    type: String,
    enum: ['architecture', 'code_quality', 'security', 'testing', 'performance', 'documentation'],
    required: true
  },
  file: {
    type: String,
    required: true
  },
  line: {
    type: Number,
    required: true
  },
  impact: {
    type: String,
    required: true
  },
  effortHours: {
    type: Number,
    required: true
  },
  recommendation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'ignored'],
    default: 'open'
  },
  author: {
    type: String,
    default: 'RepoMind AST Engine'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TechnicalDebtIssue', TechnicalDebtIssueSchema);
