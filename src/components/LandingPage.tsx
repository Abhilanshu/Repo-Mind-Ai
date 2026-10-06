import React from 'react';
import { 
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
  Cpu,
  TestTube2,
  Package,
  CalendarCheck2,
  FileText
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
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F2937] flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* Navigation Bar */}
      <nav className="h-20 border-b border-[#E8E5DF] px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto w-full bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#6D4AFF] flex items-center justify-center text-white shadow-md shadow-[#6D4AFF]/20 font-bold text-xl">
            🧠
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-xl tracking-tight text-[#1F2937]">RepoMind</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">Platform v2.5</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-[#4B5563]">
          <a href="#features" className="hover:text-[#6D4AFF] transition">Features</a>
          <a href="#github-engines" className="hover:text-[#6D4AFF] transition">GitHub Engines</a>
          <a href="#architecture" className="hover:text-[#6D4AFF] transition">AST Analysis</a>
          <a href="#enterprise" className="hover:text-[#6D4AFF] transition">Enterprise SSO</a>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onExploreDemo}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#1F2937] bg-[#F7F5F2] hover:bg-[#EEE9FF] border border-[#E8E5DF] transition flex items-center space-x-1.5"
          >
            <span>⚡ Open Dashboard</span>
          </button>
          <button
            onClick={onStartAnalysis}
            className="px-5 py-2.5 rounded-xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white text-xs font-extrabold shadow-md shadow-[#6D4AFF]/25 transition flex items-center space-x-2"
          >
            <span>🚀 Start Analysis</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 max-w-5xl mx-auto text-center relative">
        {/* Category Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-[#E8E5DF] text-[#1F2937] text-xs font-semibold mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#16803C] animate-pulse" />
          <span className="text-[#6D4AFF] font-bold">RepoMind AI</span>
          <span>— Software Repository Intelligence Platform</span>
        </div>

        {/* Primary Hero Headings */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-[#1F2937]">
          Understand your codebase.<br />
          <span className="text-[#6D4AFF]">Eliminate technical debt.</span><br />
          Ship features with confidence.
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          RepoMind synthesizes AST static analysis, dependency graphs, security vulnerability scanners, Pytest generators, and permission-based AI code refactoring into a unified engineering dashboard.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white font-extrabold text-base shadow-xl shadow-[#6D4AFF]/30 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>⚡ Open Live Engineering Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-[#F1F3F6] text-[#1F2937] font-extrabold text-base border border-[#E8E5DF] shadow-xs transition flex items-center justify-center space-x-2"
          >
            <span>📦 Add Custom GitHub Repo</span>
          </button>
        </div>

        {/* GitHub Intelligence Engines Highlight Section */}
        <div id="github-engines" className="my-12 text-left">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">
              Open-Source Architecture Foundation
            </span>
            <h2 className="text-2xl font-extrabold text-[#1F2937] mt-3">Powered by Dual GitHub Engines</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Repowise Engine Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8E5DF] shadow-md hover:border-[#D8CAFF] transition space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🐙</span>
                  <span className="font-mono font-extrabold text-[#1F2937] text-sm">repowise-dev / repowise</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#EEE9FF] text-[#6D4AFF] font-bold">AST Engine</span>
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Static AST code complexity analysis, cyclomatic markers, Halstead volume evaluation, circular module dependency graphing, and automated technical debt payback hour calculations.
              </p>
              <div className="pt-2 border-t border-[#F1F3F6] flex items-center justify-between text-xs font-bold text-[#6D4AFF]">
                <span>✓ Interactive Layer Topology Graph</span>
                <span className="font-mono text-[10px] text-[#9CA3AF]">21+ AST Markers</span>
              </div>
            </div>

            {/* Codebase Intelligence Engine Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8E5DF] shadow-md hover:border-[#C6ECD3] transition space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🧠</span>
                  <span className="font-mono font-extrabold text-[#1F2937] text-sm">Oussamcsc / codebase-intelligence</span>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#EAF7EF] text-[#16803C] font-bold">AI Agent</span>
              </div>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Permission-gated AI code agent requiring explicit developer approval ([Approve & Apply Fix]), automated Pytest test path generation, OWASP security scanner, and agile sprint task planner.
              </p>
              <div className="pt-2 border-t border-[#F1F3F6] flex items-center justify-between text-xs font-bold text-[#16803C]">
                <span>✓ Permission-Gated AI Refactor Patch</span>
                <span className="font-mono text-[10px] text-[#9CA3AF]">OWASP & Pytest</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#E8E5DF] bg-white text-center text-xs text-[#4B5563] font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} RepoMind Platform Inc. Software Repository Intelligence.</div>
          <div className="flex items-center space-x-4">
            <button onClick={onExploreDemo} className="hover:text-[#6D4AFF] font-bold">Open Dashboard</button>
            <a href="#privacy" className="hover:text-[#1F2937]">Privacy</a>
            <a href="#terms" className="hover:text-[#1F2937]">Terms</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
