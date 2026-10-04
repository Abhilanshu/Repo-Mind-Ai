import React, { useState } from 'react';
import { X, Send, Check, MessageSquare, Bell, Smartphone, Sparkles, ShieldAlert } from 'lucide-react';
import { WhatsAppConfig } from '../types/repomind';

interface WhatsAppNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WhatsAppConfig;
  onSaveConfig: (newConfig: WhatsAppConfig) => void;
  onTriggerTestNotification: (msg: string) => void;
}

export const WhatsAppNotificationModal: React.FC<WhatsAppNotificationModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onTriggerTestNotification
}) => {
  const [phone, setPhone] = useState(config.phoneNumber || '+91 98765 43210');
  const [enabled, setEnabled] = useState(config.enabled ?? true);
  const [notifyAnalysis, setNotifyAnalysis] = useState(config.notifyOnAnalysis ?? true);
  const [notifySec, setNotifySec] = useState(config.notifyOnCriticalSec ?? true);
  const [notifyFix, setNotifyFix] = useState(config.notifyOnFixApplied ?? true);
  const [notifySprint, setNotifySprint] = useState(config.notifyOnSprintReady ?? true);
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig({
      phoneNumber: phone,
      enabled,
      notifyOnAnalysis: notifyAnalysis,
      notifyOnCriticalSec: notifySec,
      notifyOnFixApplied: notifyFix,
      notifyOnSprintReady: notifySprint
    });
    onClose();
  };

  const handleSendTest = () => {
    setTestSent(true);
    const sampleMsg = `🤖 *RepoMind AI Notification*\n\n✅ *Repository Analysis Complete*\nRepository: \`Abhilanshu/Repo-Mind-Ai\`\nHealth Score: *89/100* (Good)\n18 Debt Issues found. Est. Payback: 24h.\n\n_Sent via RepoMind WhatsApp Bot_`;
    onTriggerTestNotification(sampleMsg);
    setTimeout(() => setTestSent(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#130d24] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center space-x-2">
              <span>📱 WhatsApp AI Chatbot Notifier</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Active Bot</span>
            </h2>
            <p className="text-xs text-slate-300">Receive instant WhatsApp alerts when AI completes analysis or applies code fixes.</p>
          </div>
        </div>

        {/* Form Body & Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Left Column: Form Settings */}
          <div className="space-y-4 text-xs">
            
            {/* Phone Number Input */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 flex items-center space-x-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Phone Number (with country code)</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-[#0b0813] border border-purple-900/50 rounded-xl px-3.5 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Notification Event Toggles */}
            <div className="space-y-2 pt-2 border-t border-purple-900/40">
              <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider block">Notification Triggers</span>
              
              <label className="flex items-center justify-between p-2 rounded-xl bg-purple-950/40 border border-purple-800/40 cursor-pointer hover:bg-purple-900/40 transition">
                <span className="text-slate-200">🟢 Analysis Completed</span>
                <input type="checkbox" checked={notifyAnalysis} onChange={(e) => setNotifyAnalysis(e.target.checked)} className="rounded accent-emerald-500" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-purple-950/40 border border-purple-800/40 cursor-pointer hover:bg-purple-900/40 transition">
                <span className="text-slate-200">🔴 Critical Security Alert</span>
                <input type="checkbox" checked={notifySec} onChange={(e) => setNotifySec(e.target.checked)} className="rounded accent-emerald-500" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-purple-950/40 border border-purple-800/40 cursor-pointer hover:bg-purple-900/40 transition">
                <span className="text-slate-200">🧹 Code Fix / Patch Applied</span>
                <input type="checkbox" checked={notifyFix} onChange={(e) => setNotifyFix(e.target.checked)} className="rounded accent-emerald-500" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-purple-950/40 border border-purple-800/40 cursor-pointer hover:bg-purple-900/40 transition">
                <span className="text-slate-200">📅 Sprint Action Plan Ready</span>
                <input type="checkbox" checked={notifySprint} onChange={(e) => setNotifySprint(e.target.checked)} className="rounded accent-emerald-500" />
              </label>
            </div>

          </div>

          {/* Right Column: WhatsApp UI Bubble Mockup */}
          <div className="p-4 rounded-2xl bg-[#0b141a] border border-emerald-900/50 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-900/40">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">
                  🧠
                </div>
                <span className="text-xs font-bold text-slate-200">RepoMind AI WhatsApp Bot</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400">ONLINE</span>
            </div>

            {/* WhatsApp Green Chat Bubble */}
            <div className="my-auto p-3 rounded-2xl bg-[#005c4b] text-white text-[11px] font-mono leading-relaxed shadow-lg relative">
              <p className="font-bold text-emerald-200">🤖 RepoMind AI Notification</p>
              <p className="mt-1">✅ *Repository Analysis Complete*</p>
              <p>Repo: `Abhilanshu/Repo-Mind-Ai`</p>
              <p>Health Score: *89/100* (Good)</p>
              <p className="text-[10px] text-emerald-200/80 mt-1">18 Technical Debt items cataloged. Action Plan ready!</p>
              <div className="text-[9px] text-emerald-200 text-right mt-1.5 opacity-70">
                11:21 PM ✓✓
              </div>
            </div>

            <button
              onClick={handleSendTest}
              className="mt-3 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md shadow-emerald-600/30 flex items-center justify-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{testSent ? '✓ Notification Sent to WhatsApp!' : '📱 Send Test WhatsApp Notification'}</span>
            </button>
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-purple-900/40">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-slate-300 hover:text-white text-xs font-bold border border-purple-800/40 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold transition shadow-lg shadow-emerald-600/30 flex items-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>Save WhatsApp Configuration</span>
          </button>
        </div>

      </div>
    </div>
  );
};
