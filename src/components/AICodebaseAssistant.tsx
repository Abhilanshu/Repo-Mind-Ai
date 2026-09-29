import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Copy, Check, Terminal, Code2, Flame } from 'lucide-react';
import { ChatMessage } from '../types/repomind';

interface AICodebaseAssistantProps {
  initialMessages: ChatMessage[];
  onNavigateTab?: (tab: string) => void;
}

export const AICodebaseAssistant: React.FC<AICodebaseAssistantProps> = ({
  initialMessages,
  onNavigateTab
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
    "Why is technical debt increasing?",
    "Which files should I refactor first?",
    "Explain the architecture of this project.",
    "Where are the biggest security risks?",
    "Which dependencies are outdated?",
    "What should my team fix this sprint?",
    "Show me the most complex files.",
    "Why is this module difficult to maintain?"
  ];

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

    // Simulate Senior Architect AI response
    setTimeout(() => {
      let aiText = "I have analyzed the request across the 183 Python files in `facefusion/facefusion`.";
      let codeSnippet: string | undefined = undefined;

      const q = query.toLowerCase();
      if (q.includes('architecture')) {
        aiText = "The architecture consists of 4 main layers:\n1. **Gradio UI Layer** (`facefusion-[#uis]`)\n2. **Job Queue Manager** (`job_manager.py`)\n3. **Core Engine Routine** (`core.py`)\n4. **Processor Modules** (`face_swapper`, `face_enhancer`, `frame_colorizer`).\n\nThe major architectural risk is a circular dependency between `job_manager` and `core_engine`.";
      } else if (q.includes('security') || q.includes('risk')) {
        aiText = "The highest security risk is in `facefusion/program_helper.py` at Line 42:\nUser input strings are executed via `os.system` without strict parameter sanitization. I recommend switching to `subprocess.run(args, shell=False)`.";
        codeSnippet = `# Recommended fix for program_helper.py:\nimport subprocess\n\ndef run_ffmpeg(input_path: str, output_path: str):\n    cmd = ["ffmpeg", "-i", input_path, "-vf", "scale=1280:-1", output_path]\n    subprocess.run(cmd, check=True, shell=False)`;
      } else if (q.includes('refactor') || q.includes('complex')) {
        aiText = "Top 3 files requiring refactoring:\n1. **facefusion/conda.py** (Avg Complexity: 9.0)\n2. **facefusion/core.py** (339 LOC, 13 functions, Cyclomatic Complexity: 7.85)\n3. **facefusion/uis/components/job_manager.py** (194 LOC, Maintainability Index: 69).";
      } else if (q.includes('sprint') || q.includes('fix')) {
        aiText = "For Sprint 24, prioritize:\n1. Fix command injection in `program_helper.py` (1h)\n2. Decompose `core.py` execution dispatch loop (8h)\n3. Centralize Job Manager state sync (6h).";
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: 'Just now',
        codeSnippet
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
              <span>🤖 Ask Your Codebase</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">GPT-4o Architect Engine</span>
            </h2>
            <p className="text-xs text-slate-300">Contextual AI reasoning over AST, git history, and dependency models.</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-800/40">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Repository Context Active</span>
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
                      <span className="flex items-center space-x-1"><Code2 className="w-3 h-3 text-purple-400" /><span>Suggested Refactor Patch</span></span>
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
            <span>RepoMind AI is analyzing repository AST & generating response...</span>
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
            placeholder="Ask anything about your repository..."
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
