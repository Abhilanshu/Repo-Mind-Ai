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
    <div className="card-panel rounded-3xl p-6 relative overflow-hidden bg-grad-ai border border-[#D8CAFF] font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#6D4AFF] flex items-center justify-center text-white shadow-md shadow-[#6D4AFF]/20">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#1F2937] flex items-center space-x-2">
              <span>🤖 Senior Architecture Synthesis</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF] font-bold">Repository Intelligence</span>
            </h3>
            <span className="text-[11px] text-[#4B5563]">Synthesized from parsed AST modules & commit history</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1 text-[11px] font-mono text-[#6D4AFF] bg-white px-3 py-1 rounded-lg border border-[#D8CAFF] font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#6D4AFF]" />
          <span>Real-time synthesis</span>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 rounded-2xl bg-white/90 border border-[#D8CAFF] my-3 text-[#1F2937] text-xs sm:text-sm leading-relaxed relative shadow-2xs">
        <p className="font-medium italic">
          "{summaryText}"
        </p>
      </div>

      {/* Actionable Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
        <div className="p-3 rounded-xl bg-[#FFF0F0] border border-[#F5C6C6]">
          <div className="text-[#C53030] font-bold mb-0.5">🔥 Top Risk Hotspot</div>
          <div className="text-[#1F2937] font-mono text-[11px] font-bold">src/services/paymentService.ts</div>
        </div>
        <div className="p-3 rounded-xl bg-[#FFF5E6] border border-[#F3D29A]">
          <div className="text-[#B7791F] font-bold mb-0.5">⚠️ Code Duplication</div>
          <div className="text-[#1F2937] font-mono text-[11px] font-bold">Product.js schema validation</div>
        </div>
        <div className="p-3 rounded-xl bg-[#EAF7EF] border border-[#C6ECD3]">
          <div className="text-[#16803C] font-bold mb-0.5">🛡️ Security Warning</div>
          <div className="text-[#1F2937] font-mono text-[11px] font-bold">Express CORS wildcard header</div>
        </div>
      </div>

      {/* Bottom CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#D8CAFF]">
        <button
          onClick={onGenerateActionPlan}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-xs font-bold shadow-md shadow-[#6D4AFF]/25 transition flex items-center justify-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>✨ Generate Sprint Action Plan</span>
        </button>

        <button
          onClick={onAskAI}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-[#F1F3F6] text-[#1F2937] text-xs font-bold border border-[#E8E5DF] transition flex items-center justify-center space-x-2 shadow-2xs"
        >
          <MessageSquare className="w-4 h-4 text-[#6D4AFF]" />
          <span>Open Code Agent →</span>
        </button>
      </div>

    </div>
  );
};
