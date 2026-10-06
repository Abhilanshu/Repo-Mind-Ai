const mongoose = require('mongoose');

const WhatsAppConfigSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    default: '+91 98765 43210'
  },
  apiKey: {
    type: String,
    default: ''
  },
  enabled: {
    type: Boolean,
    default: true
  },
  notifyOnAnalysis: {
    type: Boolean,
    default: true
  },
  notifyOnCriticalSec: {
    type: Boolean,
    default: true
  },
  notifyOnFixApplied: {
    type: Boolean,
    default: true
  },
  notifyOnSprintReady: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WhatsAppConfig', WhatsAppConfigSchema);
