import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Bot, 
  CheckCircle2, 
  Zap, 
  FolderGit2, 
  Network
} from 'lucide-react';

interface LandingPageProps {
  onStartAnalysis?: () => void;
  onExploreDemo?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F2937] flex flex-col justify-between overflow-x-hidden font-sans">
      
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
          Turn your codebase into an<br />
          <span className="text-[#6D4AFF]">engineering roadmap.</span><br />
          Ship features with confidence.
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-lg text-[#4B5563] max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          RepoMind analyzes your software repository, detects structural technical debt, scans for security risks, ranks remediation priorities by ROI, and provides a permission-gated AI refactoring agent.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white font-extrabold text-base shadow-xl shadow-[#6D4AFF]/30 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>🚀 Start Free Analysis</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/app"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-[#F1F3F6] text-[#1F2937] font-extrabold text-base border border-[#E8E5DF] shadow-xs transition flex items-center justify-center space-x-2"
          >
            <span>⚡ Open Live Engineering App</span>
          </Link>
        </div>

        {/* Interactive Demo Preview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E5DF] shadow-xl text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E5DF] pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">
                Real-Time Analysis Preview
              </span>
              <h3 className="text-lg font-extrabold text-[#1F2937] mt-1">RepoMind Demo Store Analysis</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-[#16803C] bg-[#EAF7EF] px-3 py-1 rounded-full border border-[#C6ECD3]">
                Health Score: 87 / 100
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-[#F7F5F2] border border-[#E8E5DF]">
              <div className="text-[#4B5563] text-[10px]">Technical Debt</div>
              <div className="text-lg font-extrabold text-[#B7791F] mt-0.5">28 Hours</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F7F5F2] border border-[#E8E5DF]">
              <div className="text-[#4B5563] text-[10px]">Security Findings</div>
              <div className="text-lg font-extrabold text-[#C53030] mt-0.5">1 Critical</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F7F5F2] border border-[#E8E5DF]">
              <div className="text-[#4B5563] text-[10px]">Test Coverage</div>
              <div className="text-lg font-extrabold text-[#16803C] mt-0.5">76% Target</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F7F5F2] border border-[#E8E5DF]">
              <div className="text-[#4B5563] text-[10px]">Dependencies</div>
              <div className="text-lg font-extrabold text-[#6D4AFF] mt-0.5">2 Outdated</div>
            </div>
          </div>
        </div>

        {/* GitHub Intelligence Engines Highlight Section */}
        <div id="github-engines" className="my-16 text-left">
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">
              Open-Source Architecture Foundation
            </span>
            <h2 className="text-2xl font-extrabold text-[#1F2937] mt-3">Powered by Dual GitHub Engines</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Repowise Engine Box */}
            <div 
              onClick={() => navigate('/app/architecture')}
              className="p-6 rounded-3xl bg-white border border-[#E8E5DF] shadow-md hover:border-[#D8CAFF] transition space-y-3 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🐙</span>
                  <span className="font-mono font-extrabold text-[#1F2937] group-hover:text-[#6D4AFF] text-sm">repowise-dev / repowise</span>
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
            <div 
              onClick={() => navigate('/app/agent')}
              className="p-6 rounded-3xl bg-white border border-[#E8E5DF] shadow-md hover:border-[#C6ECD3] transition space-y-3 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🧠</span>
                  <span className="font-mono font-extrabold text-[#1F2937] group-hover:text-[#6D4AFF] text-sm">Oussamcsc / codebase-intelligence</span>
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

    </div>
  );
};
