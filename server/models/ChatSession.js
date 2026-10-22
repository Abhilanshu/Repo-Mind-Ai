const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  sender: { type: String, enum: ['user', 'ai'], required: true },
  text: { type: String, required: true },
  codeSnippet: { type: String },
  permissionRequest: {
    id: String,
    file: String,
    line: Number,
    issueTitle: String,
    proposedCode: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  },
  timestamp: { type: String, default: () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
}, { _id: false });

const ChatSessionSchema = new mongoose.Schema({
  repoName: { type: String, required: true, index: true },
  messages: [ChatMessageSchema]
}, { timestamps: true });

module.exports = mongoose.model('ChatSession', ChatSessionSchema);
