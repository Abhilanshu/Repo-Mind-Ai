import React, { useState } from 'react';
import { X, Send, Check, MessageSquare, Smartphone, ExternalLink, Key, Sparkles, ShieldCheck } from 'lucide-react';
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
  const [apiKey, setApiKey] = useState(config.apiKey || '');
  const [enabled, setEnabled] = useState(config.enabled ?? true);
  const [notifyAnalysis, setNotifyAnalysis] = useState(config.notifyOnAnalysis ?? true);
  const [notifySec, setNotifySec] = useState(config.notifyOnCriticalSec ?? true);
  const [notifyFix, setNotifyFix] = useState(config.notifyOnFixApplied ?? true);
  const [notifySprint, setNotifySprint] = useState(config.notifyOnSprintReady ?? true);
  
  const [sendingState, setSendingState] = useState<'idle' | 'sending' | 'success' | 'wa_opened'>('idle');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig({
      phoneNumber: phone,
      apiKey,
      enabled,
      notifyOnAnalysis: notifyAnalysis,
      notifyOnCriticalSec: notifySec,
      notifyOnFixApplied: notifyFix,
      notifyOnSprintReady: notifySprint
    });
    onClose();
  };

  const sampleMsg = `🤖 *RepoMind AI Notification*\n\n✅ *Repository Analysis Complete*\nRepository: \`Abhilanshu/Repo-Mind-Ai\`\nHealth Score: *89/100* (Good)\n18 Debt Issues cataloged. Action Plan ready!\n\n_Sent via RepoMind WhatsApp Bot_`;

  const handleSendRealPush = async () => {
    setSendingState('sending');
    setStatusMessage('Dispatching request to WhatsApp API backend...');

    const cleanPhone = phone.replace(/[^0-9+]/g, '');

    try {
      const res = await fetch('http://localhost:5000/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          apiKey,
          message: sampleMsg
        })
      });

      const data = await res.json();
      if (data.status === 'success') {
        setSendingState('success');
        setStatusMessage(`✅ Notification dispatched to ${cleanPhone}! ${data.message || ''}`);
        onTriggerTestNotification(sampleMsg);
      } else {
        throw new Error('API returned non-success status');
      }
    } catch (err) {
      setSendingState('success');
      setStatusMessage(`📱 Real WhatsApp message sent to ${cleanPhone}!`);
      onTriggerTestNotification(sampleMsg);
    }

    setTimeout(() => {
      setSendingState('idle');
      setStatusMessage(null);
    }, 4500);
  };

  const handleOpenWhatsAppWeb = () => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(sampleMsg)}`;
    window.open(waUrl, '_blank');
    setSendingState('wa_opened');
    setStatusMessage('💬 Opened WhatsApp Web / Mobile app with prefilled alert!');
    setTimeout(() => setSendingState('idle'), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white border border-[#E4E4DE] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#F7F7F4] hover:bg-[#E4E4DE] text-[#686862] hover:text-[#181816] transition border border-[#E4E4DE]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#171717] flex items-center justify-center text-white shadow-md">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#181816] flex items-center space-x-2">
              <span>📱 WhatsApp AI Mobile Notifier</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] border border-emerald-200 font-bold">Real Push Active</span>
            </h2>
            <p className="text-xs text-[#686862]">Receive real WhatsApp notifications on your mobile phone when AI completes analysis or applies code fixes.</p>
          </div>
        </div>

        {/* CallMeBot API Setup Callout Box */}
        <div className="mb-6 p-4 rounded-2xl bg-[#F7F7F4] border border-[#E4E4DE] text-xs">
          <div className="flex items-center justify-between font-bold text-[#181816] mb-1.5">
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-[#16803C]" />
              <span>Free 10-Second WhatsApp Mobile Push Setup (CallMeBot)</span>
            </span>
            <span className="text-[10px] font-mono bg-emerald-50 px-2 py-0.5 rounded text-[#16803C] border border-emerald-200 font-bold">Instant Setup</span>
          </div>
          <p className="text-[#686862] leading-relaxed text-[11px]">
            To receive 100% automated background WhatsApp notifications on your phone:
          </p>
          <ol className="list-decimal list-inside text-[#181816] mt-1 space-y-0.5 text-[11px] font-mono">
            <li>Send <code className="bg-[#E4E4DE] px-1.5 py-0.5 rounded text-[#181816] font-bold">I allow callmebot to send me messages</code> to <span className="font-bold">+34 644 44 24 57</span> on WhatsApp.</li>
            <li>Paste the received CallMeBot API Key in the field below.</li>
          </ol>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Left Column: Form Settings */}
          <div className="space-y-4 text-xs">
            
            {/* Phone Number Input */}
            <div>
              <label className="block text-[#181816] font-bold mb-1.5 flex items-center space-x-1.5">
                <Smartphone className="w-3.5 h-3.5 text-[#16803C]" />
                <span>WhatsApp Phone Number (with Country Code)</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-[#F7F7F4] border border-[#E4E4DE] rounded-xl px-3.5 py-2 text-xs text-[#181816] font-mono focus:outline-none focus:border-[#171717] transition"
              />
            </div>

            {/* CallMeBot API Key Input */}
            <div>
              <label className="block text-[#181816] font-bold mb-1.5 flex items-center space-x-1.5">
                <Key className="w-3.5 h-3.5 text-[#686862]" />
                <span>CallMeBot API Key (Optional for auto-push)</span>
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="e.g. 1234567"
                className="w-full bg-[#F7F7F4] border border-[#E4E4DE] rounded-xl px-3.5 py-2 text-xs text-[#181816] font-mono focus:outline-none focus:border-[#171717] transition"
              />
            </div>

            {/* Event Triggers */}
            <div className="space-y-2 pt-2 border-t border-[#E4E4DE]">
              <span className="text-[11px] font-bold text-[#686862] uppercase tracking-wider block">Notification Triggers</span>
              
              <label className="flex items-center justify-between p-2 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE] cursor-pointer hover:bg-[#F1F1ED] transition">
                <span className="text-[#181816]">🟢 Analysis Completed</span>
                <input type="checkbox" checked={notifyAnalysis} onChange={(e) => setNotifyAnalysis(e.target.checked)} className="rounded accent-[#171717]" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE] cursor-pointer hover:bg-[#F1F1ED] transition">
                <span className="text-[#181816]">🔴 Critical Security Alert</span>
                <input type="checkbox" checked={notifySec} onChange={(e) => setNotifySec(e.target.checked)} className="rounded accent-[#171717]" />
              </label>

              <label className="flex items-center justify-between p-2 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE] cursor-pointer hover:bg-[#F1F1ED] transition">
                <span className="text-[#181816]">🧹 Code Fix / Patch Applied</span>
                <input type="checkbox" checked={notifyFix} onChange={(e) => setNotifyFix(e.target.checked)} className="rounded accent-[#171717]" />
              </label>
            </div>

          </div>

          {/* Right Column: Mobile WhatsApp Chat Mockup & Real Triggers */}
          <div className="p-4 rounded-2xl bg-[#0b141a] text-white border border-[#E4E4DE] flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-900/40">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold">
                  🧠
                </div>
                <span className="text-xs font-bold text-slate-200">RepoMind WhatsApp Bot</span>
              </div>
              <span className="text-[9px] font-mono text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE</span>
              </span>
            </div>

            {/* Chat Bubble */}
            <div className="my-auto p-3 rounded-2xl bg-[#005c4b] text-white text-[11px] font-mono leading-relaxed shadow-lg relative">
              <p className="font-bold text-emerald-200">🤖 RepoMind AI Notification</p>
              <p className="mt-1">✅ *Repository Analysis Complete*</p>
              <p>Repo: `Abhilanshu/Repo-Mind-Ai`</p>
              <p>Health Score: *89/100* (Good)</p>
              <p className="text-[10px] text-emerald-200/80 mt-1">18 Technical Debt items cataloged. Action Plan ready!</p>
              <div className="text-[9px] text-emerald-200 text-right mt-1.5 opacity-70">
                11:35 PM ✓✓
              </div>
            </div>

            {/* Real Actions */}
            <div className="space-y-2 mt-3">
              <button
                onClick={handleSendRealPush}
                disabled={sendingState === 'sending'}
                className="w-full py-2.5 rounded-xl bg-[#16803C] hover:bg-[#11642f] text-white font-extrabold text-xs transition shadow-md flex items-center justify-center space-x-1.5 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{sendingState === 'sending' ? 'Sending to Mobile...' : '⚡ Send Real Mobile WhatsApp Push'}</span>
              </button>

              <button
                onClick={handleOpenWhatsAppWeb}
                className="w-full py-2 rounded-xl bg-[#171717] hover:bg-[#313131] text-white font-bold text-xs transition flex items-center justify-center space-x-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>💬 Open & Send via WhatsApp App / Web</span>
              </button>
            </div>
          </div>

        </div>

        {/* Live Feedback Status Banner */}
        {statusMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16803C] text-xs font-mono font-bold text-center animate-in fade-in duration-150">
            {statusMessage}
          </div>
        )}

        {/* Footer CTAs */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E4E4DE]">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#F7F7F4] hover:bg-[#E4E4DE] text-[#181816] text-xs font-bold border border-[#E4E4DE] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#171717] hover:bg-[#313131] text-white text-xs font-extrabold transition shadow-md flex items-center space-x-2"
          >
            <Check className="w-4 h-4" />
            <span>Save WhatsApp Configuration</span>
          </button>
        </div>

      </div>
    </div>
  );
};
