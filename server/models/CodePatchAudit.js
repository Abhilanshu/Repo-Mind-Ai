const mongoose = require('mongoose');

const CodePatchAuditSchema = new mongoose.Schema({
  patchId: { type: String, required: true, unique: true },
  repoName: { type: String, required: true },
  issueId: { type: String },
  file: { type: String, required: true },
  line: { type: Number, required: true },
  proposedCode: { type: String, required: true },
  status: { type: String, enum: ['approved', 'rejected'], required: true },
  appliedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('CodePatchAudit', CodePatchAuditSchema);
