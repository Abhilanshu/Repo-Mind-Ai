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
    { label: 'Repository connected', icon: <CheckCircle2 className="w-4 h-4 text-[#16803C]" /> },
    { label: 'File structure analyzed (183 files parsed)', icon: <Code2 className="w-4 h-4 text-[#171717]" /> },
    { label: 'Dependencies detected (requirements.txt & packages mapped)', icon: <Cpu className="w-4 h-4 text-[#171717]" /> },
    { label: 'Architecture mapped (6 components & service graph)', icon: <Sparkles className="w-4 h-4 text-[#171717]" /> },
    { label: 'Code complexity calculated (Cyclomatic & AST metrics computed)', icon: <Code2 className="w-4 h-4 text-[#B7791F]" /> },
    { label: 'Security patterns scanned (Subprocess & SHA-256 checks)', icon: <ShieldAlert className="w-4 h-4 text-[#C53030]" /> },
    { label: 'Technical debt detected (147 issues categorized)', icon: <Sparkles className="w-4 h-4 text-[#B7791F]" /> },
    { label: 'AI generating recommendations & sprint action plan...', icon: <Loader2 className="w-4 h-4 text-[#171717] animate-spin" /> },
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
    <div className="min-h-screen bg-[#F7F7F4] text-[#181816] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      <div className="w-full max-w-xl bg-white border border-[#E4E4DE] rounded-3xl p-8 shadow-xl relative z-10 text-left">
        
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#171717] flex items-center justify-center text-white shadow-md">
            <span className="text-2xl">🧠</span>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#181816]">RepoMind AI is analyzing repository</h2>
            <p className="text-xs font-mono text-[#686862] mt-0.5">{repoName}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="text-[#686862]">Analysis Progress</span>
            <span className="text-[#181816] font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-[#E4E4DE] rounded-full overflow-hidden p-0.5">
            <div 
              className="h-full bg-[#171717] rounded-full transition-all duration-300 shadow-sm"
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
                    ? 'bg-emerald-50 border-emerald-200 text-[#181816]' 
                    : isCurrent 
                    ? 'bg-[#F7F7F4] border-[#171717] text-[#181816] font-bold' 
                    : 'opacity-40 border-transparent text-[#96968E]'
                }`}
              >
                <div className="shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-[#16803C]" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#171717] animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-[#E4E4DE]" />
                  )}
                </div>
                <span className={isCurrent ? 'font-bold' : ''}>{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Log Subtext */}
        <div className="mt-6 pt-4 border-t border-[#E4E4DE] text-[11px] font-mono text-[#686862] flex items-center justify-between">
          <span>Parsing Python AST static engine...</span>
          <span className="text-[#181816] font-bold">18,912 LOC</span>
        </div>

      </div>
    </div>
  );
};
