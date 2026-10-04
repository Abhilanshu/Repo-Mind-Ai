import React, { useState, useEffect } from 'react';
import { Cpu, Sparkles, Terminal, ShieldCheck, Zap } from 'lucide-react';

interface PreloaderProps {
  onFinish: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const statusTexts = [
    "Initializing RepoMind Intelligence Engine...",
    "Loading Python & Polyglot AST Parsers...",
    "Mapping Codebase Architectural Dependency Topology...",
    "Scanning Static Code Smells & Security Vulnerabilities...",
    "Synthesizing Senior Engineering Action Plan...",
    "RepoMind SaaS Platform Ready."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onFinish();
          }, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return Math.min(100, next);
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onFinish]);

  useEffect(() => {
    const idx = Math.min(
      statusTexts.length - 1,
      Math.floor((progress / 100) * statusTexts.length)
    );
    setCurrentTextIndex(idx);
  }, [progress, statusTexts.length]);

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F7F4] text-[#181816] flex flex-col items-center justify-center p-6 overflow-hidden select-none font-sans">
      
      {/* Top Left Tech Readout */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-[#686862] space-y-1 hidden sm:block">
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16803C] animate-ping" />
          <span className="font-bold text-[#181816]">REPOMIND_ENGINE_V2.4</span>
        </div>
        <div>SYS_STATUS: INITIALIZING</div>
        <div>AST_PARSER: ACTIVE</div>
      </div>

      {/* Top Right Tech Readout */}
      <div className="absolute top-6 right-6 font-mono text-[10px] text-[#686862] text-right space-y-1 hidden sm:block">
        <div>LATENCY: 4ms</div>
        <div>MODEL: MULTI-LLM ARCHITECT</div>
        <div>SECURITY_SCANNER: ONLINE</div>
      </div>

      {/* Central Core */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-8">
        
        {/* Sleek Logo Icon */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border border-[#E4E4DE] shadow-xl flex items-center justify-center relative">
            <span className="text-4xl sm:text-5xl">🧠</span>
            <div className="absolute -top-2 -right-2 p-1.5 rounded-lg bg-[#171717] text-white shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#E4E4DE] text-[#181816] text-[10px] font-mono uppercase tracking-widest mb-2 shadow-sm font-bold">
            <Zap className="w-3 h-3 text-[#16803C]" />
            <span>SOFTWARE REPOSITORY INTELLIGENCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#181816]">
            RepoMind Platform
          </h1>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-[#686862] font-semibold">Loading Intelligence Engine</span>
            <span className="text-[#181816] font-extrabold text-sm">{progress}%</span>
          </div>

          <div className="w-full h-3 bg-[#E4E4DE] rounded-full overflow-hidden p-0.5 relative shadow-inner">
            <div 
              className="h-full bg-[#171717] rounded-full transition-all duration-150 ease-out relative"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Dynamic Status Text */}
          <div className="h-6 flex items-center justify-center">
            <p className="text-xs font-mono text-[#686862] tracking-wide transition-all duration-200">
              {statusTexts[currentTextIndex]}
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Footer Readout */}
      <div className="absolute bottom-6 font-mono text-[10px] text-[#96968E] flex items-center space-x-4">
        <span>AST ENGINES: OK</span>
        <span>•</span>
        <span>SECURITY PARSER: OK</span>
        <span>•</span>
        <span>ENCRYPTION: 256-BIT</span>
      </div>

    </div>
  );
};
