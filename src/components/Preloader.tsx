import React, { useState, useEffect } from 'react';
import { Cpu, Sparkles, Terminal, ShieldCheck, Zap } from 'lucide-react';

interface PreloaderProps {
  onFinish: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const statusTexts = [
    "Initializing RepoMind Neural Core...",
    "Loading Python & Polyglot AST Parsers...",
    "Mapping Codebase Architectural Dependency Topology...",
    "Scanning Static Code Smells & Security Vulnerabilities...",
    "Synthesizing Senior AI Architect Action Plan...",
    "RepoMind AI System Ready."
  ];

  useEffect(() => {
    // Progress counter animation
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
    }, 90);

    return () => clearInterval(interval);
  }, [onFinish]);

  useEffect(() => {
    // Rotate text status based on progress
    const idx = Math.min(
      statusTexts.length - 1,
      Math.floor((progress / 100) * statusTexts.length)
    );
    setCurrentTextIndex(idx);
  }, [progress, statusTexts.length]);

  return (
    <div className="fixed inset-0 z-50 bg-[#07040f] text-slate-100 flex flex-col items-center justify-center p-6 overflow-hidden select-none">
      
      {/* Futuristic Background Ambient Glows & Cyber Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(168, 85, 247, 0.8) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Top Left Corner Tech Readout */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-purple-400/70 space-y-1 hidden sm:block">
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
          <span>REPOMIND_NEURAL_ENGINE_V2.4</span>
        </div>
        <div>SYS_STATUS: INITIALIZING</div>
        <div>AST_PARSER: ACTIVE</div>
      </div>

      {/* Top Right Corner Tech Readout */}
      <div className="absolute top-6 right-6 font-mono text-[10px] text-purple-400/70 text-right space-y-1 hidden sm:block">
        <div>LATENCY: 4ms</div>
        <div>MODEL: GPT-4O-ARCHITECT</div>
        <div>SECURITY_SCANNER: ONLINE</div>
      </div>

      {/* Central Neural AI Core */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-8">
        
        {/* Pulsing AI Brain Ring Logo */}
        <div className="relative flex items-center justify-center">
          
          {/* Outer Rotating Glowing Ring */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-2 border-purple-500/30 border-t-purple-400 border-r-indigo-400 animate-spin transition-all duration-1000" />

          {/* Inner Glowing Orb */}
          <div className="absolute inset-2 sm:inset-3 rounded-2xl bg-gradient-to-tr from-purple-700 via-violet-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-purple-500/40 border border-purple-400/50">
            <span className="text-4xl sm:text-5xl animate-bounce">🧠</span>
          </div>

          {/* Sparkles Floating Badges */}
          <div className="absolute -top-2 -right-2 p-1.5 rounded-lg bg-purple-500/20 border border-purple-400/40 text-purple-300 animate-pulse">
            <Sparkles className="w-4 h-4 text-purple-300" />
          </div>
          <div className="absolute -bottom-2 -left-2 p-1.5 rounded-lg bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 animate-pulse">
            <Cpu className="w-4 h-4 text-indigo-300" />
          </div>
        </div>

        {/* Brand Name */}
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-[10px] font-mono uppercase tracking-widest mb-2 shadow-inner">
            <Zap className="w-3 h-3 text-purple-400" />
            <span>AI SOFTWARE INTELLIGENCE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            RepoMind <span className="purple-gradient-text">AI</span>
          </h1>
        </div>

        {/* Sleek Futuristic Progress Bar */}
        <div className="w-full space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-400 font-semibold">Loading Neural Core</span>
            <span className="text-purple-300 font-extrabold text-sm">{progress}%</span>
          </div>

          <div className="w-full h-3 bg-purple-950/80 rounded-full overflow-hidden border border-purple-800/40 p-0.5 relative shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500 rounded-full transition-all duration-150 ease-out shadow-lg shadow-purple-500/50 relative"
              style={{ width: `${progress}%` }}
            >
              {/* Glowing leading tip */}
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-white rounded-full blur-[2px] opacity-80 animate-pulse" />
            </div>
          </div>

          {/* Dynamic Status Text Rotator */}
          <div className="h-6 flex items-center justify-center">
            <p className="text-xs font-mono text-purple-300/90 tracking-wide transition-all duration-200">
              {statusTexts[currentTextIndex]}
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Footer Readout */}
      <div className="absolute bottom-6 font-mono text-[10px] text-slate-500 flex items-center space-x-4">
        <span>AST ENGINES: OK</span>
        <span>•</span>
        <span>SECURITY PARSER: OK</span>
        <span>•</span>
        <span>ENCRYPTION: 256-BIT</span>
      </div>

    </div>
  );
};
