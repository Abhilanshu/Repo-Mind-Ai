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
    <div className="card-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between bg-grad-deps border border-[#F3D29A] font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-[#FFF5DD] border border-[#F3D29A] text-[#B7791F]">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-extrabold text-[#B7791F] uppercase tracking-wider">Technical Debt</h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-bold text-[#6D4AFF] hover:underline transition"
        >
          Explore All Issues →
        </button>
      </div>

      {/* Main Count & Hours */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
        
        <div className="p-4 rounded-2xl bg-white/90 border border-[#E8E5DF] shadow-2xs">
          <div className="text-xs text-[#4B5563] font-medium">Total Detected Issues</div>
          <div className="text-3xl font-extrabold text-[#1F2937] mt-1">{totalIssues}</div>
          <div className="text-[11px] text-[#4B5563] mt-1 font-mono">
            Across 42 parsed repository files
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/90 border border-[#E8E5DF] shadow-2xs">
          <div className="text-xs text-[#4B5563] font-medium flex items-center justify-between">
            <span>Estimated Payback Effort</span>
            <Clock className="w-3.5 h-3.5 text-[#B7791F]" />
          </div>
          <div className="text-3xl font-extrabold text-[#1F2937] mt-1">
            {debtHours} <span className="text-sm font-normal text-[#4B5563]">hours</span>
          </div>
          <div className="text-[11px] text-[#16803C] mt-1 flex items-center space-x-1 font-mono font-semibold">
            <TrendingDown className="w-3 h-3" />
            <span>{Math.abs(trendDelta)}% reduction from previous audit</span>
          </div>
        </div>

      </div>

      {/* Severity Breakdown Bar & Cards */}
      <div className="mt-4 pt-4 border-t border-[#F3D29A] space-y-3">
        
        {/* Visual Bar */}
        <div className="w-full h-2.5 bg-[#F1F3F6] rounded-full overflow-hidden flex p-0.5 border border-[#E8E5DF]">
          <div style={{ width: `${(breakdown.critical / Math.max(1, totalIssues)) * 100}%` }} className="h-full bg-[#C53030] rounded-l-full" title="Critical" />
          <div style={{ width: `${(breakdown.high / Math.max(1, totalIssues)) * 100}%` }} className="h-full bg-[#B7791F]" title="High" />
          <div style={{ width: `${(breakdown.medium / Math.max(1, totalIssues)) * 100}%` }} className="h-full bg-[#1D4ED8]" title="Medium" />
          <div style={{ width: `${(breakdown.low / Math.max(1, totalIssues)) * 100}%` }} className="h-full bg-[#4B5563] rounded-r-full" title="Low" />
        </div>

        {/* Breakdown Items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          
          <div className="p-2.5 rounded-xl bg-[#FFF0F0] border border-[#F5C6C6] flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-semibold text-[#C53030]">
              <span className="w-2 h-2 rounded-full bg-[#C53030]" />
              <span>Critical</span>
            </div>
            <span className="font-mono font-bold text-[#C53030]">{breakdown.critical}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#FFF5E6] border border-[#F3D29A] flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-semibold text-[#B7791F]">
              <span className="w-2 h-2 rounded-full bg-[#B7791F]" />
              <span>High</span>
            </div>
            <span className="font-mono font-bold text-[#B7791F]">{breakdown.high}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#EEF5FF] border border-[#C8D9F5] flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-semibold text-[#1D4ED8]">
              <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" />
              <span>Medium</span>
            </div>
            <span className="font-mono font-bold text-[#1D4ED8]">{breakdown.medium}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#E8E5DF] flex items-center justify-between">
            <div className="flex items-center space-x-1.5 font-semibold text-[#4B5563]">
              <span className="w-2 h-2 rounded-full bg-[#4B5563]" />
              <span>Low</span>
            </div>
            <span className="font-mono font-bold text-[#1F2937]">{breakdown.low}</span>
          </div>

        </div>

      </div>

    </div>
  );
};
