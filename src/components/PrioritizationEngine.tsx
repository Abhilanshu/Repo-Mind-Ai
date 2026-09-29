import React from 'react';
import { Flame, ArrowRight, Zap, Calculator, Sparkles, CheckCircle2 } from 'lucide-react';
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
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white">What Should I Fix First?</h3>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            AI automated priority ranking combining <span className="text-purple-300 font-mono">Impact + Risk + Churn + Complexity + Effort</span>
          </p>
        </div>

        <button
          onClick={onGenerateSprintPlan}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-purple-600/20 transition flex items-center space-x-2 shrink-0"
        >
          <CalendarCheck2Icon />
          <span>Generate Sprint Plan →</span>
        </button>
      </div>

      {/* Formula Pill Banner */}
      <div className="mb-6 p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-[11px] font-mono text-purple-300 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="w-3.5 h-3.5 text-purple-400" />
          <span>Prioritization Formula: Score = (Impact × 0.35) + (Risk × 0.35) + (Frequency × 0.15) / Effort</span>
        </div>
        <span className="hidden md:inline text-slate-400">Algorithmic ROI Ranking</span>
      </div>

      {/* Actions List */}
      <div className="space-y-4">
        {actions.map((act) => (
          <div 
            key={act.id}
            className="p-4 rounded-2xl bg-purple-950/30 hover:bg-purple-900/30 border border-purple-800/40 hover:border-purple-500/40 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="flex items-start space-x-3">
              <div className="w-7 h-7 rounded-xl bg-purple-900/60 border border-purple-700/50 flex items-center justify-center text-xs font-bold text-purple-200 shrink-0 mt-0.5">
                #{act.rank}
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-200 transition">
                  {act.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-snug">
                  {act.description}
                </p>

                {/* Badges row */}
                <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Impact: {act.impact}
                  </span>
                  <span className={`px-2 py-0.5 rounded border ${
                    act.risk === 'Critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                    act.risk === 'High' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                    'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    Risk: {act.risk}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Effort: {act.effort}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                    ROI Score: {act.roiScore}/100
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onViewIssue(act.issueId)}
              className="px-3.5 py-2 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-700/40 text-xs font-bold text-purple-300 hover:text-white transition flex items-center justify-center space-x-1 shrink-0 self-end sm:self-center"
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
  <svg className="w-4 h-4 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
