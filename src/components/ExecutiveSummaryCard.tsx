import React from 'react';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';

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
    <div className="card-panel rounded-3xl p-6 relative overflow-hidden bg-white border border-[#E4E4DE] shadow-sm font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#171717] flex items-center justify-center text-white shadow-sm">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#181816] flex items-center space-x-2">
              <span>🤖 Senior Architecture Synthesis</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F1F1ED] text-[#181816] border border-[#E4E4DE]">Repository Intelligence</span>
            </h3>
            <span className="text-[11px] text-[#686862]">Synthesized from parsed AST modules & commit history</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1 text-[11px] font-mono text-[#181816] bg-[#F7F7F4] px-2.5 py-1 rounded-lg border border-[#E4E4DE]">
          <Sparkles className="w-3 h-3 text-[#171717]" />
          <span>Real-time synthesis</span>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 rounded-2xl bg-[#F7F7F4] border border-[#E4E4DE] my-3 text-[#181816] text-xs sm:text-sm leading-relaxed relative">
        <p className="font-normal italic">
          "{summaryText}"
        </p>
      </div>

      {/* Actionable Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
        <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
          <div className="text-[#C53030] font-bold mb-0.5">🔥 Top Risk Hotspot</div>
          <div className="text-[#686862] font-mono text-[11px]">src/services/paymentService.ts</div>
        </div>
        <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
          <div className="text-[#B7791F] font-bold mb-0.5">⚠️ Code Duplication</div>
          <div className="text-[#686862] font-mono text-[11px]">Product.js schema validation</div>
        </div>
        <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
          <div className="text-[#16803C] font-bold mb-0.5">🛡️ Security Warning</div>
          <div className="text-[#686862] font-mono text-[11px]">Express CORS wildcard header</div>
        </div>
      </div>

      {/* Bottom CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#E4E4DE]">
        <button
          onClick={onGenerateActionPlan}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#313131] text-white text-xs font-extrabold shadow-sm transition flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>✨ Generate Sprint Action Plan</span>
        </button>

        <button
          onClick={onAskAI}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F7F7F4] hover:bg-[#F1F1ED] text-[#181816] text-xs font-bold border border-[#E4E4DE] transition flex items-center justify-center space-x-2"
        >
          <MessageSquare className="w-4 h-4 text-[#171717]" />
          <span>Open Code Agent →</span>
        </button>
      </div>

    </div>
  );
};
