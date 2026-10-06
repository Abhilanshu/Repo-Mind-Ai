const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: [true, 'Password hash is required']
  },
  phoneNumber: {
    type: String,
    default: '+91 98765 43210',
    trim: true
  },
  role: {
    type: String,
    default: 'Senior Architect',
    enum: ['Senior Architect', 'Full Stack Developer', 'Security Specialist', 'Engineering Manager', 'Admin', 'Lead Engineer', 'Developer', 'Viewer']
  },
  plan: {
    type: String,
    default: 'Pro Plan'
  },
  avatar: {
    type: String,
    default: ''
  },
  organizationId: {
    type: String,
    default: 'org_repomind_main'
  }
}, {
  timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
