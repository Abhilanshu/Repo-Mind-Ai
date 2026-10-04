import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Copy, Check, Terminal, Code2, ShieldAlert, CheckCircle2, XCircle, FileCode2 } from 'lucide-react';
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
    "Diagnose codebase errors & fix issues",
    "Why is technical debt increasing?",
    "Which files should I refactor first?",
    "Explain the architecture of this project.",
    "Where are the biggest security risks?",
    "Generate refactoring patch for core controller",
    "What should my team fix this sprint?"
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
      // Append approval acknowledgment message from Antigravity AI
      const ackMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        text: "✅ **Fix Approved & Applied Successfully!**\n\nI have committed the refactoring patch to your codebase repository (`Commit e8f910a`). The maintainability index for that module has improved by **+14%**.",
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, ackMsg]);
      if (onApplyFixSuccess) onApplyFixSuccess("Approved & Applied AI Code Patch");
    } else {
      const rejectMsg: ChatMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        text: "Understood. The proposed patch was declined. No files were modified in your repository.",
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

    // Simulate Antigravity AI Pair Programmer response logic
    setTimeout(() => {
      let aiText = "I am **Antigravity AI**, pair programming with you on this codebase.";
      let codeSnippet: string | undefined = undefined;
      let permissionRequest: PermissionRequest | undefined = undefined;

      const q = query.toLowerCase();

      if (q.includes('diagnose') || q.includes('error') || q.includes('fix')) {
        aiText = "I have inspected the repository static analysis trace logs. I detected a **high cyclomatic complexity and unhandled exception risk** in `src/controllers/coreController.ts` at Line 114.\n\nI have prepared an optimized refactoring patch that cleans up nested callback branches and enforces strict parameter validation. **Before applying any edits to your codebase, I am asking for your explicit permission.**";
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
          issueTitle: 'High Cyclomatic Complexity & Unhandled Exception Risk',
          proposedCode: codeSnippet,
          status: 'pending'
        };
      } else if (q.includes('architecture')) {
        aiText = "The repository follows a clean 3-tier architecture:\n1. **Frontend Dashboard Layer**: React 19 + Tailwind CSS\n2. **REST API Gateway**: Python `repomind_server.py`\n3. **Static Analysis Engine**: Python AST parser `scratch/analyze_repo.py`.\n\nThe system has an overall stability score of **89/100**.";
      } else if (q.includes('security') || q.includes('risk')) {
        aiText = "Security Audit Findings:\n1. **CORS Wildcard Warning**: `repomind_server.py` line 14 permits `*` origin.\n\nWould you like me to generate a fix and ask permission to update `repomind_server.py`?";
      } else {
        aiText = `I have analyzed your request regarding \`${query}\`. The static analysis engine parsed your codebase components cleanly. Let me know if you would like me to diagnose specific files or apply automated refactoring patches.`;
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
    <div className="glass-panel rounded-3xl p-6 h-[calc(100vh-10rem)] flex flex-col justify-between relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-900/40 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
            <Bot className="w-5 h-5 text-purple-200" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
              <span>🤖 Antigravity AI Pair Programmer</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Agentic Mode Active</span>
            </h2>
            <p className="text-xs text-slate-300">Empirical error diagnosis, step-by-step reasoning, and permission-based auto-fixing.</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/40">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
          <span>Explicit Permission Required Before Code Edits</span>
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
                  ? 'bg-purple-700/80 text-white border border-purple-400/40 shadow-md shadow-purple-900/30' 
                  : 'bg-indigo-600 text-white font-bold text-xs'
              }`}>
                {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                isAI 
                  ? 'bg-purple-950/60 border border-purple-800/40 text-slate-200' 
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium shadow-md'
              }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.codeSnippet && (
                  <div className="mt-3 relative group">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#080512] rounded-t-xl border-t border-x border-purple-800/40 text-[10px] font-mono text-purple-300">
                      <span className="flex items-center space-x-1"><Code2 className="w-3 h-3 text-purple-400" /><span>Proposed Code Refactor</span></span>
                      <button
                        onClick={() => copyCode(msg.codeSnippet!, msg.id)}
                        className="hover:text-white transition flex items-center space-x-1"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                    </div>
                    <pre className="p-3 bg-[#080512] text-purple-200 font-mono text-[11px] rounded-b-xl border border-purple-800/40 overflow-x-auto">
                      {msg.codeSnippet}
                    </pre>
                  </div>
                )}

                {/* Antigravity Explicit Permission Request Box */}
                {msg.permissionRequest && (
                  <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-purple-950/90 to-indigo-950/90 border border-purple-500/50 shadow-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-purple-300 flex items-center space-x-1.5">
                        <Terminal className="w-3.5 h-3.5 text-purple-400" />
                        <span>Antigravity Permission Request</span>
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

                    <div className="text-[11px] font-mono text-slate-300">
                      Target File: <span className="text-purple-300 font-bold">{msg.permissionRequest.file}</span> (Line {msg.permissionRequest.line})
                    </div>

                    {msg.permissionRequest.status === 'pending' ? (
                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          onClick={() => handlePermissionDecision(msg.id, 'approved')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition shadow-md shadow-emerald-600/30 flex items-center space-x-1.5"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>✅ Approve & Apply Fix to Codebase</span>
                        </button>
                        <button
                          onClick={() => handlePermissionDecision(msg.id, 'rejected')}
                          className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800/40 text-rose-300 text-xs font-bold transition flex items-center space-x-1"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Decline</span>
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

                {msg.suggestedActions && (
                  <div className="mt-3 pt-3 border-t border-purple-900/40 flex flex-wrap gap-2">
                    {msg.suggestedActions.map((act, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(act.label)}
                        className="px-2.5 py-1 rounded-lg bg-purple-900/50 hover:bg-purple-800 text-purple-300 text-[11px] font-semibold border border-purple-700/40 transition"
                      >
                        {act.label} →
                      </button>
                    ))}
                  </div>
                )}

                <div className="text-[9px] font-mono text-slate-400 mt-2 text-right">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-3 text-xs text-purple-300 font-mono">
            <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <span>Antigravity AI is diagnosing codebase AST trace & preparing response...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="pt-3 border-t border-purple-900/30 overflow-x-auto flex items-center space-x-2 shrink-0 py-2">
        {promptChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="px-3 py-1.5 rounded-full bg-purple-950/60 hover:bg-purple-900/60 border border-purple-800/40 text-[11px] font-semibold text-purple-300 hover:text-white shrink-0 transition"
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
          className="flex items-center space-x-2 bg-[#0b0813] p-2 rounded-2xl border border-purple-800/40 focus-within:border-purple-500 transition"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Antigravity AI to diagnose errors or refactor your codebase..."
            className="flex-1 bg-transparent px-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition shadow-md shadow-purple-600/30"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
