import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, Sparkles, Cpu, Code2, ShieldAlert } from 'lucide-react';

interface AnalysisProgressScreenProps {
  repoName: string;
  onComplete: () => void;
}

export const AnalysisProgressScreen: React.FC<AnalysisProgressScreenProps> = ({
  repoName,
  onComplete
}) => {
  const steps = [
    { label: 'Repository connected', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { label: 'File structure analyzed (183 files parsed)', icon: <Code2 className="w-4 h-4 text-purple-400" /> },
    { label: 'Dependencies detected (requirements.txt & packages mapped)', icon: <Cpu className="w-4 h-4 text-indigo-400" /> },
    { label: 'Architecture mapped (6 components & service graph)', icon: <Sparkles className="w-4 h-4 text-purple-300" /> },
    { label: 'Code complexity calculated (Cyclomatic & AST metrics computed)', icon: <Code2 className="w-4 h-4 text-violet-400" /> },
    { label: 'Security patterns scanned (Subprocess & SHA-256 checks)', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
    { label: 'Technical debt detected (147 issues categorized)', icon: <Sparkles className="w-4 h-4 text-amber-400" /> },
    { label: 'AI generating recommendations & sprint action plan...', icon: <Loader2 className="w-4 h-4 text-purple-400 animate-spin" /> },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(finishTimer);
    }
  }, [currentStep, onComplete, steps.length]);

  const progressPercent = Math.min(100, Math.round(((currentStep + 1) / steps.length) * 100));

  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl bg-[#130d24] border border-purple-500/40 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative z-10 text-left">
        
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <span className="text-2xl animate-pulse">🧠</span>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white">RepoMind AI is analyzing repository</h2>
            <p className="text-xs font-mono text-purple-300 mt-0.5">{repoName}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="text-slate-400">Analysis Progress</span>
            <span className="text-purple-300 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-purple-950/80 rounded-full overflow-hidden border border-purple-900/50 p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 rounded-full transition-all duration-300 shadow-md shadow-purple-500/40"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Stages Checkmarks */}
        <div className="space-y-3 font-mono text-xs">
          {steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div 
                key={idx}
                className={`flex items-center space-x-3 p-2.5 rounded-xl border transition-all duration-200 ${
                  isDone 
                    ? 'bg-purple-950/30 border-purple-800/30 text-slate-200' 
                    : isCurrent 
                    ? 'bg-purple-900/40 border-purple-500/50 text-white shadow-md shadow-purple-900/30' 
                    : 'opacity-40 border-transparent text-slate-500'
                }`}
              >
                <div className="shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700" />
                  )}
                </div>
                <span className={isCurrent ? 'font-bold' : ''}>{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Log Subtext */}
        <div className="mt-6 pt-4 border-t border-purple-900/40 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>Parsing Python AST AST parsing engine...</span>
          <span className="text-purple-400">18,912 LOC</span>
        </div>

      </div>
    </div>
  );
};
