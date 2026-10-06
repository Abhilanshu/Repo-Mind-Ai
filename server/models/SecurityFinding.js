const mongoose = require('mongoose');

const SecurityFindingSchema = new mongoose.Schema({
  findingId: {
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
  cve: {
    type: String,
    default: 'CVE-LOCAL'
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  mitigation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'patch_ready', 'resolved'],
    default: 'open'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SecurityFinding', SecurityFindingSchema);
