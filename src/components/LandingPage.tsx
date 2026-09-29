import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  Network, 
  FileCode2, 
  Bot, 
  CheckCircle2, 
  Zap, 
  FolderGit2, 
  GitBranch, 
  Layers, 
  Lock,
  Cpu
} from 'lucide-react';

interface LandingPageProps {
  onStartAnalysis: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAnalysis,
  onExploreDemo
}) => {
  return (
    <div className="min-h-screen bg-[#0b0813] text-slate-100 flex flex-col justify-between overflow-x-hidden">
      
      {/* Landing Top Nav */}
      <nav className="h-20 border-b border-purple-900/30 px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30 border border-purple-400/40">
            <span className="text-xl">🧠</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-xl tracking-tight text-white">RepoMind</span>
            <span className="text-xs uppercase font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">AI</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-slate-300">
          <a href="#features" className="hover:text-purple-300 transition">Features</a>
          <a href="#positioning" className="hover:text-purple-300 transition">AI Architecture</a>
          <a href="#security" className="hover:text-purple-300 transition">Security</a>
          <a href="#demo" className="hover:text-purple-300 transition">Live Demo</a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onExploreDemo}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/40 transition"
          >
            Explore Demo →
          </button>
          <button
            onClick={onStartAnalysis}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-purple-600/30 transition flex items-center space-x-2"
          >
            <span>🚀 Analyze Repository</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 max-w-6xl mx-auto text-center relative">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

        {/* Small Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-semibold mb-8 shadow-inner shadow-purple-500/20 animate-pulse-glow">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          <span>🟣 AI-POWERED CODEBASE INTELLIGENCE</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Understand Your Codebase.<br />
          <span className="purple-gradient-text">Fix Technical Debt.</span><br />
          Build Better Software.
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          RepoMind AI analyzes your entire repository and transforms thousands of lines of code into actionable engineering intelligence.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>🚀 Analyze Repository</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-purple-950/60 hover:bg-purple-900/60 text-slate-200 hover:text-white font-semibold text-base border border-purple-500/30 shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>View Demo →</span>
          </button>
        </div>

        {/* Visual Dashboard Preview Container */}
        <div className="relative rounded-2xl p-2 bg-gradient-to-b from-purple-500/30 via-purple-900/20 to-transparent border border-purple-500/40 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto overflow-hidden group">
          <div className="bg-[#0e0a1c] rounded-xl p-4 sm:p-6 border border-purple-900/50 shadow-inner">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-purple-900/40">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-purple-300 ml-2">repomind-dashboard-v2.4.preview</span>
              </div>
              <div className="text-[11px] font-mono bg-purple-950/80 text-purple-300 px-2.5 py-1 rounded border border-purple-800/40">
                Health Score: 78 / 100 (Good)
              </div>
            </div>

            {/* Mock Dashboard Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40">
                <div className="text-xs font-semibold text-slate-400">Technical Debt</div>
                <div className="text-2xl font-extrabold text-amber-400 mt-1">147 Issues</div>
                <div className="text-[11px] text-slate-400 mt-1">Est. 184 engineering hours</div>
              </div>
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40">
                <div className="text-xs font-semibold text-slate-400">Security Health</div>
                <div className="text-2xl font-extrabold text-emerald-400 mt-1">91 / 100</div>
                <div className="text-[11px] text-slate-400 mt-1">1 Critical vulnerability detected</div>
              </div>
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40">
                <div className="text-xs font-semibold text-slate-400">Maintainability Index</div>
                <div className="text-2xl font-extrabold text-purple-300 mt-1">82 / 100</div>
                <div className="text-[11px] text-slate-400 mt-1">183 Python AST modules analyzed</div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-800/40 text-left flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-white">AI Engineering Executive Summary</p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  "Your repository has a healthy foundation, but the execution and UI manager layers contain significant complexity and duplicated logic in core.py and job_manager.py."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Product Positioning Section */}
      <section id="positioning" className="py-20 px-6 border-t border-purple-900/30 bg-[#0e091a]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            "Your repository has a story. <span className="purple-gradient-text">AI can understand it.</span>"
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-16">
            From raw source code to an optimized engineering roadmap in seconds.
          </p>

          {/* Animated Flowchart Connections */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center">
            
            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-center">
              <FolderGit2 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-white">Repository</div>
              <div className="text-[10px] text-slate-400 mt-1">Git / AST Upload</div>
            </div>

            <div className="hidden md:flex justify-center">
              <ArrowRight className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>

            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-center">
              <Cpu className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-white">Code Intelligence Engine</div>
              <div className="text-[10px] text-slate-400 mt-1">AST & Dependency Parse</div>
            </div>

            <div className="hidden md:flex justify-center">
              <ArrowRight className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>

            <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/40 text-center">
              <Sparkles className="w-6 h-6 text-violet-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-white">AI Analysis & Debt Detection</div>
              <div className="text-[10px] text-slate-400 mt-1">Pattern & Risk Mapping</div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-center shadow-lg shadow-purple-600/30 col-span-1 md:col-span-1">
              <CheckCircle2 className="w-6 h-6 text-emerald-300 mx-auto mb-2" />
              <div className="text-xs font-bold text-white">Engineering Action Plan</div>
              <div className="text-[10px] text-purple-200 mt-1">Sprint Priorities & Diffs</div>
            </div>

          </div>
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="border-t border-purple-900/30 py-8 px-6 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <span>🧠 RepoMind AI</span>
          <span>— Built for Software Engineers & Tech Leads</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-purple-300 transition">Privacy</a>
          <a href="#" className="hover:text-purple-300 transition">Terms</a>
          <a href="#" className="hover:text-purple-300 transition">Documentation</a>
          <a href="#" className="hover:text-purple-300 transition">GitHub</a>
        </div>
      </footer>

    </div>
  );
};
