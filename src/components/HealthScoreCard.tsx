import React from 'react';
import { HealthBreakdown } from '../types/repomind';

interface HealthScoreCardProps {
  score: number;
  breakdown: HealthBreakdown;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score, breakdown }) => {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const metrics = [
    { label: 'Code Quality', emoji: '🧹', score: breakdown.codeQuality, color: 'bg-[#6D4AFF]' },
    { label: 'Architecture', emoji: '🏗️', score: breakdown.architecture, color: 'bg-[#6D4AFF]' },
    { label: 'Security', emoji: '🔐', score: breakdown.security, color: 'bg-[#16803C]' },
    { label: 'Testing', emoji: '🧪', score: breakdown.testing, color: 'bg-[#1D4ED8]' },
    { label: 'Dependencies', emoji: '📦', score: breakdown.dependencies, color: 'bg-[#B7791F]' },
    { label: 'Documentation', emoji: '📝', score: breakdown.documentation, color: 'bg-[#4B5563]' },
  ];

  return (
    <div className="card-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between font-sans bg-grad-health border border-[#C6ECD3]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-extrabold text-[#16803C] uppercase tracking-wider flex items-center space-x-1.5">
          <span>🟢 Repository Health</span>
        </h3>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#EAF7EF] text-[#16803C] border border-[#C6ECD3] flex items-center space-x-1">
          <span>{score} / 100</span>
        </span>
      </div>

      {/* Circular Visualization & Narrative Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 my-2">
        {/* Circular Progress Ring */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="9"
              className="text-[#C6ECD3]"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#16803C"
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-[#1F2937] tracking-tight">{score}</span>
            <span className="text-[10px] uppercase font-bold text-[#16803C] tracking-wider">Good Condition</span>
          </div>
        </div>

        {/* Narrative */}
        <div className="flex-1 text-center sm:text-left">
          <h4 className="text-base font-extrabold text-[#1F2937] mb-1">
            Your codebase is in good condition. 4 areas need attention.
          </h4>
          <p className="text-xs text-[#4B5563] leading-relaxed mb-3">
            Evaluated across static AST complexity, security vulnerability scans, test coverage, and technical debt.
          </p>
          <div className="inline-flex items-center space-x-2 text-[11px] text-[#16803C] font-mono bg-[#EAF7EF] px-3 py-1 rounded-lg border border-[#C6ECD3] font-semibold">
            <span>✓ Verified by Repository Intelligence Engine</span>
          </div>
        </div>
      </div>

      {/* Metrics Breakdown Grid */}
      <div className="mt-4 pt-4 border-t border-[#C6ECD3] grid grid-cols-2 sm:grid-cols-3 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-2.5 rounded-xl bg-white/90 border border-[#E8E5DF] shadow-2xs">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1F2937] mb-1.5">
              <span className="flex items-center space-x-1.5">
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </span>
              <span className="font-mono font-bold text-[#1F2937]">{m.score}</span>
            </div>
            <div className="w-full h-1.5 bg-[#F1F3F6] rounded-full overflow-hidden">
              <div 
                className={`h-full ${m.color} rounded-full transition-all duration-700`}
                style={{ width: `${m.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
