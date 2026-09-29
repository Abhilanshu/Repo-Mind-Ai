import React from 'react';
import { AlertTriangle, Clock, TrendingDown, ShieldAlert } from 'lucide-react';
import { Severity } from '../types/repomind';

interface TechnicalDebtCardProps {
  totalIssues: number;
  breakdown: Record<Severity, number>;
  debtHours: number;
  trendDelta: number;
  onViewAll: () => void;
}

export const TechnicalDebtCard: React.FC<TechnicalDebtCardProps> = ({
  totalIssues,
  breakdown,
  debtHours,
  trendDelta,
  onViewAll
}) => {
  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Glow */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Technical Debt</h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-purple-300 hover:text-white transition"
        >
          Explore All Issues →
        </button>
      </div>

      {/* Main Count & Hours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
        
        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40">
          <div className="text-xs text-slate-400 font-medium">Total Detected Issues</div>
          <div className="text-3xl font-extrabold text-amber-400 mt-1">{totalIssues}</div>
          <div className="text-[11px] text-slate-300 mt-1 font-mono">
            Across 183 parsed files
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/40">
          <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
            <span>Estimated Payback Effort</span>
            <Clock className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-purple-300 mt-1">
            {debtHours} <span className="text-sm font-normal text-slate-400">hours</span>
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center space-x-1 font-mono">
            <TrendingDown className="w-3 h-3" />
            <span>{Math.abs(trendDelta)}% reduction from previous audit</span>
          </div>
        </div>

      </div>

      {/* Severity Breakdown Bar & Cards */}
      <div className="mt-4 pt-4 border-t border-purple-900/40 space-y-3">
        
        {/* Visual Bar */}
        <div className="w-full h-3 bg-purple-950 rounded-full overflow-hidden flex p-0.5 border border-purple-900/50">
          <div style={{ width: `${(breakdown.critical / totalIssues) * 100}%` }} className="h-full bg-rose-500 rounded-l-full" title="Critical" />
          <div style={{ width: `${(breakdown.high / totalIssues) * 100}%` }} className="h-full bg-orange-500" title="High" />
          <div style={{ width: `${(breakdown.medium / totalIssues) * 100}%` }} className="h-full bg-amber-400" title="Medium" />
          <div style={{ width: `${(breakdown.low / totalIssues) * 100}%` }} className="h-full bg-sky-400 rounded-r-full" title="Low" />
        </div>

        {/* Breakdown Items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          
          <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-rose-300">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Critical</span>
            </div>
            <span className="font-mono font-bold text-white text-xs">{breakdown.critical}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-orange-950/30 border border-orange-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-orange-300">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>High</span>
            </div>
            <span className="font-mono font-bold text-white text-xs">{breakdown.high}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-amber-300">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Medium</span>
            </div>
            <span className="font-mono font-bold text-white text-xs">{breakdown.medium}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-sky-950/30 border border-sky-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-sky-300">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Low</span>
            </div>
            <span className="font-mono font-bold text-white text-xs">{breakdown.low}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
