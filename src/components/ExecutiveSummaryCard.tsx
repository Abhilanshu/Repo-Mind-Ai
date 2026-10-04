import React from 'react';
import { Bot, Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';

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
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden bg-[#110B1F] border border-[#2A1B42] shadow-xl font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#4C1D95] flex items-center justify-center text-white shadow-md shadow-[#7C3AED]/20 border border-[#8B5CF6]/30">
            <Bot className="w-5 h-5 text-[#C4B5FD]" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
              <span>🤖 Senior Architecture Synthesis</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/30">Repository Intelligence</span>
            </h3>
            <span className="text-[11px] text-[#A9A1B8]">Synthesized from parsed AST modules & commit history</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1 text-[11px] font-mono text-[#C4B5FD] bg-[#171026] px-2.5 py-1 rounded-lg border border-[#2A1B42]">
          <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
          <span>Real-time synthesis</span>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 rounded-2xl bg-[#171026] border border-[#2A1B42] my-3 text-slate-200 text-xs sm:text-sm leading-relaxed relative">
        <p className="font-normal italic">
          "{summaryText}"
        </p>
      </div>

      {/* Actionable Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
        <div className="p-3 rounded-xl bg-[#171026] border border-[#2A1B42]">
          <div className="text-[#C4B5FD] font-bold mb-0.5">🔥 Top Risk Hotspot</div>
          <div className="text-[#A9A1B8] font-mono text-[11px]">src/controllers/coreController.ts</div>
        </div>
        <div className="p-3 rounded-xl bg-[#171026] border border-[#2A1B42]">
          <div className="text-amber-300 font-bold mb-0.5">⚠️ Code Duplication</div>
          <div className="text-[#A9A1B8] font-mono text-[11px]">state sync rendering loop</div>
        </div>
        <div className="p-3 rounded-xl bg-[#171026] border border-[#2A1B42]">
          <div className="text-emerald-300 font-bold mb-0.5">🛡️ Security Alert</div>
          <div className="text-[#A9A1B8] font-mono text-[11px]">1 CORS origin wildcard warning</div>
        </div>
      </div>

      {/* Bottom CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#2A1B42]">
        <button
          onClick={onGenerateActionPlan}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white text-xs font-extrabold shadow-lg shadow-[#7C3AED]/20 transition flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4 text-purple-200" />
          <span>✨ Generate Sprint Action Plan</span>
        </button>

        <button
          onClick={onAskAI}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#171026] hover:bg-[#2A1B42] text-[#C4B5FD] hover:text-white text-xs font-bold border border-[#2A1B42] transition flex items-center justify-center space-x-2"
        >
          <MessageSquare className="w-4 h-4 text-[#8B5CF6]" />
          <span>Open Code Agent →</span>
        </button>
      </div>

    </div>
  );
};
