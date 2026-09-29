import React from 'react';
import { Bot, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface ExecutiveSummaryCardProps {
  summaryText: string;
  onGenerateActionPlan: () => void;
  onAskAI: () => void;
}

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({
  summaryText,
  onGenerateActionPlan,
  onAskAI
}) => {
  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden bg-gradient-to-br from-[#160d33]/90 via-[#130d2b]/80 to-[#190a36]/90 border border-purple-500/40 shadow-2xl">
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-500/30 border border-purple-400/30">
            <Bot className="w-5 h-5 text-purple-200" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <span>🤖 AI Engineering Summary</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">Senior Architect AI</span>
            </h3>
            <span className="text-[11px] text-slate-400">Synthesized from 183 parsed AST files & commit history</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1 text-[11px] font-mono text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/40">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Real-time synthesis</span>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40 my-3 text-slate-200 text-xs sm:text-sm leading-relaxed relative">
        <p className="font-normal italic">
          "{summaryText}"
        </p>
      </div>

      {/* Actionable Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/40">
          <div className="text-purple-300 font-bold mb-0.5">🔥 Top Risk Hotspot</div>
          <div className="text-slate-300 font-mono text-[11px]">facefusion/core.py</div>
        </div>
        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/40">
          <div className="text-amber-300 font-bold mb-0.5">⚠️ Code Duplication</div>
          <div className="text-slate-300 font-mono text-[11px]">job_manager.py state sync</div>
        </div>
        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-900/40">
          <div className="text-emerald-300 font-bold mb-0.5">🛡️ Security Alert</div>
          <div className="text-slate-300 font-mono text-[11px]">Subprocess shell call</div>
        </div>
      </div>

      {/* Bottom CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-purple-900/40">
        <button
          onClick={onGenerateActionPlan}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-purple-600/30 transition flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4 text-purple-200" />
          <span>✨ Generate Action Plan</span>
        </button>

        <button
          onClick={onAskAI}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/60 text-purple-200 hover:text-white text-xs font-bold border border-purple-700/40 transition flex items-center justify-center space-x-2"
        >
          <MessageSquare className="w-4 h-4 text-purple-400" />
          <span>Ask AI Assistant →</span>
        </button>
      </div>

    </div>
  );
};
