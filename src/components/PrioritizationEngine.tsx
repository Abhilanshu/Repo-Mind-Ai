import React from 'react';
import { Flame, ArrowRight, Calculator } from 'lucide-react';
import { PrioritizedAction } from '../types/repomind';

interface PrioritizationEngineProps {
  actions: PrioritizedAction[];
  onGenerateSprintPlan: () => void;
  onViewIssue: (issueId: string) => void;
}

export const PrioritizationEngine: React.FC<PrioritizationEngineProps> = ({
  actions,
  onGenerateSprintPlan,
  onViewIssue
}) => {
  return (
    <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE] shadow-sm font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-[#B7791F]" />
            <h3 className="text-base font-extrabold text-[#181816]">What Should I Fix First?</h3>
          </div>
          <p className="text-xs text-[#686862] mt-0.5">
            Algorithmic priority ranking combining <span className="text-[#181816] font-mono font-semibold">Impact + Risk + Churn + Complexity + Effort</span>
          </p>
        </div>

        <button
          onClick={onGenerateSprintPlan}
          className="px-4 py-2 rounded-xl bg-[#171717] hover:bg-[#313131] text-white text-xs font-extrabold shadow-sm transition flex items-center space-x-2 shrink-0"
        >
          <CalendarCheck2Icon />
          <span>Generate Sprint Plan →</span>
        </button>
      </div>

      {/* Formula Pill Banner */}
      <div className="mb-6 p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE] text-[11px] font-mono text-[#181816] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="w-3.5 h-3.5 text-[#686862]" />
          <span>Prioritization Formula: Score = (Impact × 0.35) + (Risk × 0.35) + (Frequency × 0.15) / Effort</span>
        </div>
        <span className="hidden md:inline text-[#96968E]">Algorithmic ROI Ranking</span>
      </div>

      {/* Actions List */}
      <div className="space-y-3">
        {actions.map((act) => (
          <div 
            key={act.id}
            className="p-4 rounded-2xl bg-[#F7F7F4] hover:bg-[#F1F1ED] border border-[#E4E4DE] transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-xl bg-[#171717] flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">
                #{act.rank}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#181816] group-hover:text-black transition">
                  {act.title}
                </h4>
                <p className="text-xs text-[#686862] mt-1 leading-snug">
                  {act.description}
                </p>

                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-[#F1F1ED] text-[#181816] border border-[#E4E4DE]">
                    Impact: {act.impact}
                  </span>
                  <span className={`px-2 py-0.5 rounded border ${
                    act.risk === 'Critical' ? 'bg-rose-50 text-[#C53030] border-rose-200' :
                    act.risk === 'High' ? 'bg-amber-50 text-[#B7791F] border-amber-200' :
                    'bg-blue-50 text-[#315EFB] border-blue-200'
                  }`}>
                    Risk: {act.risk}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#F1F1ED] text-[#181816] border border-[#E4E4DE]">
                    Effort: {act.effort}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-[#16803C] border border-emerald-200 font-bold">
                    ROI Score: {act.roiScore}/100
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onViewIssue(act.issueId)}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F1F1ED] border border-[#E4E4DE] text-xs font-bold text-[#181816] transition flex items-center justify-center space-x-1 shrink-0 self-end sm:self-center"
            >
              <span>Inspect Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

const CalendarCheck2Icon = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
