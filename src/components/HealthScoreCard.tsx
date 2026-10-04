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
    { label: 'Code Quality', emoji: '🧹', score: breakdown.codeQuality, color: 'from-[#7C3AED] to-[#8B5CF6]' },
    { label: 'Architecture', emoji: '🏗️', score: breakdown.architecture, color: 'from-[#4C1D95] to-[#7C3AED]' },
    { label: 'Security', emoji: '🔐', score: breakdown.security, color: 'from-emerald-500 to-teal-500' },
    { label: 'Testing', emoji: '🧪', score: breakdown.testing, color: 'from-indigo-500 to-[#8B5CF6]' },
    { label: 'Dependencies', emoji: '📦', score: breakdown.dependencies, color: 'from-[#8B5CF6] to-[#C4B5FD]' },
    { label: 'Documentation', emoji: '📝', score: breakdown.documentation, color: 'from-[#A78BFA] to-purple-400' },
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between font-sans bg-[#110B1F] border border-[#2A1B42]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-extrabold text-[#A9A1B8] uppercase tracking-wider">Repository Health</h3>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
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
              strokeWidth="9"
              className="text-[#171026]"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="url(#brandPurpleGradient)"
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="brandPurpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C4B5FD" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-white tracking-tight">{score}</span>
            <span className="text-[10px] uppercase font-bold text-[#C4B5FD] tracking-wider">Index Score</span>
          </div>
        </div>

        {/* Narrative */}
        <div className="flex-1 text-center sm:text-left">
          <h4 className="text-base font-extrabold text-white mb-1">
            Your codebase is healthy, but 4 areas need attention.
          </h4>
          <p className="text-xs text-[#A9A1B8] leading-relaxed mb-3">
            Parsed across AST complexity modules, supply chain vulnerabilities, unit test mocks, and technical debt hours.
          </p>
          <div className="inline-flex items-center space-x-2 text-[11px] text-[#C4B5FD] font-mono bg-[#171026] px-3 py-1 rounded-lg border border-[#2A1B42]">
            <span>✓ Verified by Repository Intelligence Engine</span>
          </div>
        </div>
      </div>

      {/* Metrics Breakdown Matrix */}
      <div className="mt-4 pt-4 border-t border-[#2A1B42] grid grid-cols-2 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-2.5 rounded-xl bg-[#171026] border border-[#2A1B42]">
            <div className="flex items-center justify-between text-xs font-semibold text-[#F8F7FF] mb-1.5">
              <span className="flex items-center space-x-1.5">
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </span>
              <span className="font-mono font-bold text-white">{m.score}</span>
            </div>
            <div className="w-full h-1.5 bg-[#090611] rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${m.color} rounded-full transition-all duration-700`}
                style={{ width: `${m.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
