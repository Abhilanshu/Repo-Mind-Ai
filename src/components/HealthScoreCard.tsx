import React from 'react';
import { HealthBreakdown } from '../types/repomind';

interface HealthScoreCardProps {
  score: number;
  breakdown: HealthBreakdown;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score, breakdown }) => {
  // Circular SVG ring math
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const metrics = [
    { label: 'Code Quality', emoji: '🧹', score: breakdown.codeQuality, color: 'from-purple-500 to-violet-500' },
    { label: 'Architecture', emoji: '🏗️', score: breakdown.architecture, color: 'from-indigo-500 to-purple-500' },
    { label: 'Security', emoji: '🔐', score: breakdown.security, color: 'from-emerald-500 to-teal-500' },
    { label: 'Testing', emoji: '🧪', score: breakdown.testing, color: 'from-amber-500 to-orange-500' },
    { label: 'Dependencies', emoji: '📦', score: breakdown.dependencies, color: 'from-purple-400 to-indigo-400' },
    { label: 'Documentation', emoji: '📝', score: breakdown.documentation, color: 'from-rose-400 to-purple-400' },
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Repository Health</h3>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Good Condition
        </span>
      </div>

      {/* Score Hero Ring Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 my-2">
        {/* Animated Circular Score Ring */}
        <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              className="text-purple-950/80"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="url(#purpleGradient)"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-white tracking-tight">{score}</span>
            <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">out of 100</span>
          </div>
        </div>

        {/* Narrative & Key Highlight */}
        <div className="flex-1 text-center sm:text-left">
          <h4 className="text-base font-bold text-white mb-1">Codebase Stability Index</h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Overall codebase index computed from 183 Python modules, AST complexity, dependency CVEs, and test coverage.
          </p>
          <div className="inline-flex items-center space-x-2 text-[11px] text-purple-300 font-mono bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800/40">
            <span>↑ +4% since last sprint</span>
          </div>
        </div>
      </div>

      {/* Metrics Breakdown Matrix */}
      <div className="mt-4 pt-4 border-t border-purple-900/40 grid grid-cols-2 gap-3">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-800/30">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span className="flex items-center space-x-1.5">
                <span>{m.emoji}</span>
                <span>{m.label}</span>
              </span>
              <span className="font-mono font-bold text-white">{m.score}</span>
            </div>
            <div className="w-full h-1.5 bg-purple-950 rounded-full overflow-hidden">
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
