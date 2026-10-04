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
    { label: 'Code Quality', emoji: '🧹', score: breakdown.codeQuality, color: 'bg-[#171717]' },
    { label: 'Architecture', emoji: '🏗️', score: breakdown.architecture, color: 'bg-[#171717]' },
    { label: 'Security', emoji: '🔐', score: breakdown.security, color: 'bg-[#16803C]' },
    { label: 'Testing', emoji: '🧪', score: breakdown.testing, color: 'bg-[#315EFB]' },
    { label: 'Dependencies', emoji: '📦', score: breakdown.dependencies, color: 'bg-[#B7791F]' },
    { label: 'Documentation', emoji: '📝', score: breakdown.documentation, color: 'bg-[#686862]' },
  ];

  return (
    <div className="card-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between font-sans bg-white border border-[#E4E4DE]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-extrabold text-[#686862] uppercase tracking-wider">Repository Health</h3>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-[#16803C] border border-emerald-200 flex items-center space-x-1">
          <span>🟢</span>
          <span>{score} / 100</span>
        </span>
      </div>

      {/* Score Hero Ring Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 my-2">
        {/* Circular Score Ring */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              className="text-[#F1F1ED]"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#171717"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-[#181816] tracking-tight">{score}</span>
            <span className="text-[10px] uppercase font-bold text-[#686862] tracking-wider">Index Score</span>
          </div>
        </div>

        {/* Narrative */}
        <div className="flex-1 text-center sm:text-left">
          <h4 className="text-base font-extrabold text-[#181816] mb-1">
            Your codebase is healthy, but 4 areas need attention.
          </h4>
          <p className="text-xs text-[#686862] leading-relaxed mb-3">
            Parsed across AST complexity modules, supply chain vulnerabilities, unit test mocks, and technical debt hours.
          </p>
          <div className="inline-flex items-center space-x-2 text-[11px] text-[#181816] font-mono bg-[#F7F7F4] px-3 py-1 rounded-lg border border-[#E4E4DE]">
            <span>✓ Verified by Repository Intelligence Engine</span>
          </div>
        </div>
      </div>

      {/* Metrics Breakdown Matrix */}
      <div className="mt-4 pt-4 border-t border-[#E4E4DE] grid grid-cols-2 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-2.5 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#181816] mb-1.5">
              <span className="flex items-center space-x-1.5">
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </span>
              <span className="font-mono font-bold text-[#181816]">{m.score}</span>
            </div>
            <div className="w-full h-1.5 bg-[#E4E4DE] rounded-full overflow-hidden">
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
