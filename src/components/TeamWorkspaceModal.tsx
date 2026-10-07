import React, { useState } from 'react';
import { X, Users, MessageSquare, Send, Code, Play, Sparkles, Check, FileCode2, UserCheck } from 'lucide-react';

interface TeamWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRepoName?: string;
}

export const TeamWorkspaceModal: React.FC<TeamWorkspaceModalProps> = ({
  isOpen,
  onClose,
  currentRepoName = "RepoMind Demo Store"
}) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'chat'>('editor');
  const [activeFile, setActiveFile] = useState('src/services/paymentService.ts');
  const [codeContent, setCodeContent] = useState(`// src/services/paymentService.ts
// Live Team Collaboration Code Editor

export async function processPayment(orderId: string, amount: number, payload: any) {
  console.log(\`[PAYMENT] Processing order \${orderId} for amount \${amount}\`);
  
  // TODO: Add Zod input schema validation
  if (!payload || !payload.token) {
    throw new Error("Invalid payment payload token");
  }

  const result = await fetch("https://api.paymentgateway.com/v1/charge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId, amount, token: payload.token })
  });

  return result.json();
}`);

  const [chatMessages, setChatMessages] = useState([
    { sender: 'Senior Architect', text: 'Hey team, reviewing src/services/paymentService.ts. Let\'s fix the missing schema guard.', time: '10:42 AM' },
    { sender: 'Full Stack Dev', text: 'Sounds good! I am watching the live editor.', time: '10:43 AM' },
    { sender: 'Security Specialist', text: 'Make sure we add input validation before calling fetch.', time: '10:44 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiSuccessMsg, setAiSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { sender: 'You (Lead Engineer)', text: newMessage.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    setNewMessage('');
  };

  const handleAiRefactorLive = () => {
    setAiAnalyzing(true);
    setTimeout(() => {
      setCodeContent(`// src/services/paymentService.ts (Refactored by RepoMind AI)
import { z } from 'zod';

const PaymentPayloadSchema = z.object({
  token: z.string().min(10, 'Invalid token length'),
  currency: z.string().default('USD')
});

export async function processPayment(orderId: string, amount: number, rawPayload: unknown) {
  // Validated by RepoMind AI Security Guard
  const payload = PaymentPayloadSchema.parse(rawPayload);
  
  console.log(\`[PAYMENT SECURE] Processing order \${orderId} for \${amount} \${payload.currency}\`);

  const result = await fetch("https://api.paymentgateway.com/v1/charge", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "X-Idempotency-Key": orderId
    },
    body: JSON.stringify({ orderId, amount, token: payload.token })
  });

  return result.json();
}`);
      setAiAnalyzing(false);
      setAiSuccessMsg("✨ RepoMind AI refactored live code with Zod schema validation & Idempotency!");
      setTimeout(() => setAiSuccessMsg(null), 4000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4 font-sans text-[#1F2937]">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-[#E8E5DF] shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E5DF] bg-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6D4AFF] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#6D4AFF]/20">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-extrabold text-[#1F2937]">Live Team Workspace Mode</h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#EAF7EF] text-[#16803C] border border-[#C6ECD3]">
                  3 Members Online
                </span>
              </div>
              <p className="text-xs text-[#4B5563]">Collaborative multi-user live code editing, team chat, and AI pair programming for {currentRepoName}.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#F7F5F2] hover:bg-[#EEE9FF] text-[#4B5563] hover:text-[#1F2937] transition border border-[#E8E5DF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workspace Body Split Grid */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Left Column: Live Code Editor (2/3 width) */}
          <div className="flex-1 flex flex-col border-r border-[#E8E5DF] bg-[#F7F5F2]">
            {/* Editor Toolbar */}
            <div className="px-4 py-2 bg-white border-b border-[#E8E5DF] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2">
                <FileCode2 className="w-4 h-4 text-[#6D4AFF]" />
                <span className="font-bold text-[#1F2937]">{activeFile}</span>
                <span className="text-[10px] text-[#16803C] font-bold">● Live Sync</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleAiRefactorLive}
                  disabled={aiAnalyzing}
                  className="px-3 py-1.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-[11px] font-extrabold transition shadow-xs flex items-center space-x-1.5 disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>{aiAnalyzing ? "AI Rewriting Code..." : "AI Auto-Refactor Code"}</span>
                </button>
              </div>
            </div>

            {aiSuccessMsg && (
              <div className="p-3 bg-emerald-50 border-b border-emerald-200 text-[#16803C] text-xs font-mono font-bold flex items-center space-x-2">
                <Check className="w-4 h-4 text-[#16803C]" />
                <span>{aiSuccessMsg}</span>
              </div>
            )}

            {/* Code Textarea / Editor */}
            <textarea
              value={codeContent}
              onChange={(e) => setCodeContent(e.target.value)}
              className="flex-1 w-full p-4 bg-[#1E1E2E] text-slate-100 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-[#6D4AFF]"
              spellCheck={false}
            />
          </div>

          {/* Right Column: Live Team Chat & Active Presence (1/3 width) */}
          <div className="w-full md:w-80 flex flex-col bg-white border-t md:border-t-0 border-[#E8E5DF]">
            {/* Online Members Bar */}
            <div className="p-3 bg-[#F7F5F2] border-b border-[#E8E5DF] text-xs">
              <div className="font-bold text-[#1F2937] mb-2 flex items-center space-x-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#16803C]" />
                <span>Active Team Presence</span>
              </div>
              <div className="flex flex-wrap gap-1 text-[10px] font-mono">
                <span className="px-2 py-0.5 rounded bg-white border border-[#E8E5DF] text-[#1F2937] font-bold">🟢 You (Lead)</span>
                <span className="px-2 py-0.5 rounded bg-white border border-[#E8E5DF] text-[#4B5563]">🟢 Architect</span>
                <span className="px-2 py-0.5 rounded bg-white border border-[#E8E5DF] text-[#4B5563]">🟢 Security Auditor</span>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
              {chatMessages.map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#F7F5F2] border border-[#E8E5DF] space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#4B5563] font-mono font-bold">
                    <span>{m.sender}</span>
                    <span>{m.time}</span>
                  </div>
                  <p className="text-[#1F2937] leading-snug">{m.text}</p>
                </div>
              ))}
            </div>

            {/* Chat Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-[#E8E5DF] bg-white flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type message to team..."
                className="flex-1 bg-[#F7F5F2] border border-[#E8E5DF] rounded-xl px-3 py-2 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#6D4AFF]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white transition shadow-xs"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
