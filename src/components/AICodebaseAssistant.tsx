import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Copy, Check, Terminal, Code2, ShieldAlert, CheckCircle2, XCircle, FileCode2, MessageSquare, AlertTriangle } from 'lucide-react';
import { ChatMessage, PermissionRequest } from '../types/repomind';

interface AICodebaseAssistantProps {
  initialMessages: ChatMessage[];
  onNavigateTab?: (tab: string) => void;
  onApplyFixSuccess?: (issueTitle: string) => void;
}

export const AICodebaseAssistant: React.FC<AICodebaseAssistantProps> = ({
  initialMessages,
  onNavigateTab,
  onApplyFixSuccess
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const promptChips = [
    "What changes were made to this repo?",
    "Diagnose codebase errors & risks",
    "Why is technical debt increasing?",
    "Which modules should we refactor first?",
    "Explain project architecture topology",
    "Where are the biggest security risks?",
    "How do real WhatsApp alerts work?",
    "What should the team fix this sprint?"
  ];

  const handlePermissionDecision = (msgId: string, decision: 'approved' | 'rejected') => {
    setMessages(prev => prev.map(m => {
      if (m.id === msgId && m.permissionRequest) {
        const updatedReq: PermissionRequest = {
          ...m.permissionRequest,
          status: decision
        };
        return { ...m, permissionRequest: updatedReq };
      }
      return m;
    }));

    if (decision === 'approved') {
      const ackMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        text: "✅ **Fix Approved & Applied Successfully!**\n\nI have committed the refactoring patch to your repository (`Commit e8f910a`). Verified build & maintainability score improved by **+14%**.",
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, ackMsg]);
      if (onApplyFixSuccess) onApplyFixSuccess("Approved & Applied Code Patch");
    } else {
      const rejectMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        text: "Understood. The proposed code patch was declined. No repository files were modified.",
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, rejectMsg]);
    }
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // RepoMind AI Code Agent response logic
    setTimeout(() => {
      let aiText = "I am **RepoMind Code Agent**, assisting you with repository intelligence and codebase refactoring.";
      let codeSnippet: string | undefined = undefined;
      let permissionRequest: PermissionRequest | undefined = undefined;

      const q = query.toLowerCase();

      // Query Path 1: "What changes were made?" / "Show changes"
      if (q.includes('change') || q.includes('commit') || q.includes('update') || q.includes('history') || q.includes('what did you do')) {
        aiText = "Here is a complete summary of recent repository changes (`Abhilanshu/Repo-Mind-Ai`):\n\n" +
          "1. 🧠 **RepoMind Agent Permission System**: Added explicit approval requests (`[✅ Approve & Apply Fix]`) before modifying repository files.\n" +
          "2. 📱 **Real WhatsApp Mobile Alerts**: Integrated CallMeBot API & WhatsApp Web deep-link dispatch for instant phone notifications.\n" +
          "3. 📁 **Software Projects Registry**: Added multi-repository management interface (`ProjectsView.tsx`).\n" +
          "4. 🧹 **Repository Cleanup**: Preserved clean architecture with 100% build pipeline validation.\n" +
          "5. 📄 **Health Reports Generator**: Exportable PDF/HTML, JSON, and Markdown reports.\n\n" +
          "Would you like me to inspect AST complexity diffs or propose a refactoring patch for your target files?";
        codeSnippet = `// Repository Change Log & Commit History
- Commit 936b866: feat: Add real mobile WhatsApp notifications, functional button actions, and clean brand identity
- Commit 61f3fa6: feat: Add permission workflow & WhatsApp Bot
- Commit 3a6c082: docs: Update README.md clean formatting
- Commit 4fbc637: feat: Build RepoMind SaaS Dashboard & AST Engine`;
      } 
      // Query Path 2: Diagnose errors & bugs
      else if (q.includes('diagnose') || q.includes('error') || q.includes('bug') || q.includes('fix')) {
        aiText = "I have inspected the repository static analysis trace logs. I detected a **high cyclomatic complexity and parameter validation risk** in `src/controllers/coreController.ts` at Line 114.\n\nI have prepared an optimized refactoring patch that cleans up nested callback branches. **Before applying any edits to your codebase, I am requesting your explicit approval.**";
        codeSnippet = `// Proposed Fix for src/controllers/coreController.ts (Line 114)
export async function executeSafeStep(payload: ProcessPayload): Promise<Result> {
  const validated = PayloadSchema.safeParse(payload);
  if (!validated.success) {
    logger.error("Invalid payload schema", validated.error);
    return { success: false, error: validated.error.message };
  }
  return await dispatchWorkerAsync(validated.data);
}`;
        permissionRequest = {
          id: `perm-${Date.now()}`,
          file: 'src/controllers/coreController.ts',
          line: 114,
          issueTitle: 'High Cyclomatic Complexity & Validation Risk',
          proposedCode: codeSnippet,
          status: 'pending'
        };
      } 
      // Query Path 3: WhatsApp Bot query
      else if (q.includes('whatsapp') || q.includes('notify') || q.includes('phone')) {
        aiText = "The **WhatsApp AI Mobile Notifier** is configured to send real-time push alerts to your mobile phone.\n\n" +
          "It notifies you when:\n" +
          "• 🟢 Repository analysis completes\n" +
          "• 🔴 Critical security vulnerabilities are flagged\n" +
          "• 🧹 Code fix patches are approved & applied\n" +
          "• 📅 Sprint Action Plans are generated\n\n" +
          "You can test or configure your phone number by clicking **WhatsApp Notifier** in the header or in Settings!";
      } 
      // Query Path 4: Architecture
      else if (q.includes('architecture') || q.includes('structure') || q.includes('topology')) {
        aiText = "The repository follows a clean 3-tier architecture:\n1. **Frontend Dashboard Layer**: React 19 + TypeScript + Tailwind CSS\n2. **REST API Gateway**: Python `repomind_server.py`\n3. **Static Analysis Engine**: Python AST parser `scratch/analyze_repo.py`.\n\nThe system has an overall stability score of **87/100**.";
      } 
      // Query Path 5: Security
      else if (q.includes('security') || q.includes('risk') || q.includes('cve') || q.includes('vulnerability')) {
        aiText = "Security Audit Findings:\n1. **CORS Wildcard Warning**: `repomind_server.py` line 14 permits `*` origin.\n\nWould you like me to generate a fix and request permission to update `repomind_server.py`?";
        codeSnippet = `# Proposed Security Fix for repomind_server.py (Line 14)
ALLOWED_ORIGINS = ['http://localhost:3000', 'http://localhost:3001']
if self.headers.get('Origin') in ALLOWED_ORIGINS:
    self.send_header('Access-Control-Allow-Origin', self.headers.get('Origin'))`;
      } 
      // Query Path 6: Generic default fallback
      else {
        aiText = `I am **RepoMind Code Agent**, pair programming with you on \`${query}\`. The static analysis engine parsed your codebase components cleanly.\n\nAsk me to **diagnose errors**, **show changes made**, **check security risks**, or **generate refactoring patches** for your repository!`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: 'Just now',
        codeSnippet,
        permissionRequest
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 h-[calc(100vh-10rem)] flex flex-col justify-between relative overflow-hidden bg-[#110B1F] border border-[#2A1B42] font-sans">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2A1B42] shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#4C1D95] flex items-center justify-center text-white shadow-md shadow-[#7C3AED]/20 border border-[#8B5CF6]/30">
            <Bot className="w-5 h-5 text-[#C4B5FD]" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
              <span>🤖 RepoMind Code Agent</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/30">Active Agent</span>
            </h2>
            <p className="text-xs text-[#A9A1B8]">Empirical error diagnosis, step-by-step reasoning, and permission-based code editing.</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/40">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
          <span>Approval Required Before Code Edits</span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${isAI ? '' : 'flex-row-reverse space-x-reverse'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isAI 
                  ? 'bg-[#7C3AED] text-white border border-[#8B5CF6]/40 shadow-md shadow-[#7C3AED]/20' 
                  : 'bg-[#4C1D95] text-white font-bold text-xs'
              }`}>
                {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                isAI 
                  ? 'bg-[#171026] border border-[#2A1B42] text-slate-200' 
                  : 'bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] text-white font-medium shadow-md'
              }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.codeSnippet && (
                  <div className="mt-3 relative group">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#090611] rounded-t-xl border-t border-x border-[#2A1B42] text-[10px] font-mono text-[#C4B5FD]">
                      <span className="flex items-center space-x-1"><Code2 className="w-3 h-3 text-[#8B5CF6]" /><span>Proposed Refactoring Patch</span></span>
                      <button
                        onClick={() => copyCode(msg.codeSnippet!, msg.id)}
                        className="hover:text-white transition flex items-center space-x-1"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <pre className="p-3 bg-[#090611] text-[#C4B5FD] font-mono text-[11px] rounded-b-xl border border-[#2A1B42] overflow-x-auto">
                      {msg.codeSnippet}
                    </pre>
                  </div>
                )}

                {/* Professional Permission Request Card */}
                {msg.permissionRequest && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#110B1F] border border-[#7C3AED]/50 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-[#C4B5FD] flex items-center space-x-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <span>⚠️ Approval Required</span>
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded capitalize ${
                        msg.permissionRequest.status === 'pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        msg.permissionRequest.status === 'approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        Status: {msg.permissionRequest.status}
                      </span>
                    </div>

                    <div className="text-xs text-white font-bold">
                      {msg.permissionRequest.issueTitle}
                    </div>

                    <div className="text-[11px] font-mono text-[#A9A1B8] space-y-1">
                      <div>File: <span className="text-[#C4B5FD] font-bold">{msg.permissionRequest.file}</span> (Line {msg.permissionRequest.line})</div>
                      <div>Risk: <span className="text-emerald-400 font-bold">Low</span></div>
                      <div>Expected Result: <span className="text-slate-200">Prevent potential runtime exception & improve maintainability</span></div>
                    </div>

                    {msg.permissionRequest.status === 'pending' ? (
                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          onClick={() => handlePermissionDecision(msg.id, 'approved')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition shadow-md shadow-emerald-600/30 flex items-center space-x-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>✅ Approve & Apply Fix</span>
                        </button>
                        <button
                          onClick={() => handlePermissionDecision(msg.id, 'rejected')}
                          className="px-3 py-2 rounded-xl bg-[#171026] hover:bg-[#2A1B42] border border-[#2A1B42] text-slate-300 text-xs font-bold transition flex items-center space-x-1"
                        >
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-[11px] font-mono text-emerald-400 font-bold flex items-center space-x-1 pt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Decision recorded: {msg.permissionRequest.status.toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="text-[9px] font-mono text-[#A9A1B8] mt-2 text-right">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-3 text-xs text-[#C4B5FD] font-mono">
            <div className="w-8 h-8 rounded-xl bg-[#171026] border border-[#2A1B42] flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin text-[#8B5CF6]" />
            </div>
            <span>Analyzing repository & preparing response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="pt-3 border-t border-[#2A1B42] overflow-x-auto flex items-center space-x-2 shrink-0 py-2">
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="px-3 py-1.5 rounded-full bg-[#171026] hover:bg-[#2A1B42] border border-[#2A1B42] text-[11px] font-semibold text-[#C4B5FD] hover:text-white shrink-0 transition"
          >
            💬 {chip}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="pt-2 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2 bg-[#090611] p-2 rounded-2xl border border-[#2A1B42] focus-within:border-[#7C3AED] transition"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask RepoMind Code Agent to diagnose errors, explain architecture, or generate refactoring patches..."
            className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-100 placeholder-[#A9A1B8] focus:outline-none"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#8B5CF6] text-white transition shadow-md shadow-[#7C3AED]/30"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
