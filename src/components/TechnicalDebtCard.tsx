import React from 'react';
import { AlertTriangle, Clock, TrendingDown } from 'lucide-react';
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
    <div className="card-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between bg-white border border-[#E4E4DE] font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE] text-[#B7791F]">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-extrabold text-[#686862] uppercase tracking-wider">Technical Debt</h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-[#181816] hover:underline transition"
        >
          Explore All Issues →
        </button>
      </div>

      {/* Main Count & Hours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
        
        <div className="p-4 rounded-2xl bg-[#F7F7F4] border border-[#E4E4DE]">
          <div className="text-xs text-[#686862] font-medium">Total Detected Issues</div>
          <div className="text-3xl font-extrabold text-[#181816] mt-1">{totalIssues}</div>
          <div className="text-[11px] text-[#686862] mt-1 font-mono">
            Across 42 parsed repository files
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#F7F7F4] border border-[#E4E4DE]">
          <div className="text-xs text-[#686862] font-medium flex items-center justify-between">
            <span>Estimated Payback Effort</span>
            <Clock className="w-3.5 h-3.5 text-[#686862]" />
          </div>
          <div className="text-3xl font-extrabold text-[#181816] mt-1">
            {debtHours} <span className="text-sm font-normal text-[#686862]">hours</span>
          </div>
          <div className="text-[11px] text-[#16803C] mt-1 flex items-center space-x-1 font-mono">
            <TrendingDown className="w-3 h-3" />
            <span>{Math.abs(trendDelta)}% reduction from previous audit</span>
          </div>
        </div>

      </div>

      {/* Severity Breakdown Bar & Cards */}
      <div className="mt-4 pt-4 border-t border-[#E4E4DE] space-y-3">
        
        {/* Visual Bar */}
        <div className="w-full h-2.5 bg-[#F1F1ED] rounded-full overflow-hidden flex p-0.5 border border-[#E4E4DE]">
          <div style={{ width: `${(breakdown.critical / Math.max(1, totalIssues)) * 100}%` }} className="h-full bg-[#C53030] rounded-l-full" title="Critical" />
          <div style={{ width: `${(breakdown.high / Math.max(1, totalIssues)) * 100}%` }} className="h-full bg-[#B7791F]" title="High" />
          <div style={{ width: `${(breakdown.medium / Math.max(1, totalIssues)) * 100}%` }} className="h-full bg-[#315EFB]" title="Medium" />
          <div style={{ width: `${(breakdown.low / Math.max(1, totalIssues)) * 100}%` }} className="h-full bg-[#686862] rounded-r-full" title="Low" />
        </div>

        {/* Breakdown Items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-semibold text-[#C53030]">
              <span className="w-2 h-2 rounded-full bg-[#C53030]" />
              <span>Critical</span>
            </div>
            <span className="font-mono font-bold text-[#181816]">{breakdown.critical}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-semibold text-[#B7791F]">
              <span className="w-2 h-2 rounded-full bg-[#B7791F]" />
              <span>High</span>
            </div>
            <span className="font-mono font-bold text-[#181816]">{breakdown.high}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-semibold text-[#315EFB]">
              <span className="w-2 h-2 rounded-full bg-[#315EFB]" />
              <span>Medium</span>
            </div>
            <span className="font-mono font-bold text-[#181816]">{breakdown.medium}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE] flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-semibold text-[#686862]">
              <span className="w-2 h-2 rounded-full bg-[#686862]" />
              <span>Low</span>
            </div>
            <span className="font-mono font-bold text-[#181816]">{breakdown.low}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
