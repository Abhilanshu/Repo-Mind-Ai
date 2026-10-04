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
    <div className="min-h-screen bg-[#F7F7F4] text-[#181816] flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* Navigation Bar */}
      <nav className="h-20 border-b border-[#E4E4DE] px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto w-full bg-white">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#171717] flex items-center justify-center text-white shadow-md">
            <span className="text-xl">🧠</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-xl tracking-tight text-[#181816]">RepoMind</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#F1F1ED] text-[#181816] border border-[#E4E4DE]">Platform</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-[#686862]">
          <a href="#features" className="hover:text-[#181816] transition">Capabilities</a>
          <a href="#architecture" className="hover:text-[#181816] transition">Architecture</a>
          <a href="#security" className="hover:text-[#181816] transition">Security</a>
          <a href="#enterprise" className="hover:text-[#181816] transition">Enterprise</a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onExploreDemo}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#181816] bg-[#F7F7F4] hover:bg-[#E4E4DE] border border-[#E4E4DE] transition"
          >
            ▶ Explore Platform
          </button>
          <button
            onClick={onStartAnalysis}
            className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#313131] text-white text-xs font-extrabold shadow-md transition flex items-center space-x-2"
          >
            <span>🚀 Start Free</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6 max-w-5xl mx-auto text-center relative">
        {/* Category Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-[#E4E4DE] text-[#181816] text-xs font-semibold mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#16803C]" />
          <span>Repository Intelligence & Engineering Productivity Platform</span>
        </div>

        {/* Primary Hero Headings */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-[#181816]">
          Understand your codebase.<br />
          <span className="text-[#171717]">Improve your software.</span><br />
          Ship with confidence.
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-[#686862] max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          RepoMind gives engineering teams a complete view of repository health, technical debt, dependencies, testing coverage and development risks.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#171717] hover:bg-[#313131] text-white font-extrabold text-base shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>🚀 Start Free Analysis</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-[#F1F1ED] text-[#181816] font-extrabold text-base border border-[#E4E4DE] shadow-sm transition"
          >
            ▶ Explore Demo Store
          </button>
        </div>

        {/* Key Feature Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-5 rounded-2xl bg-white border border-[#E4E4DE] shadow-sm">
            <div className="text-xs text-[#686862]">Static AST Analysis</div>
            <div className="text-2xl font-extrabold text-[#181816] mt-1">21+ Markers</div>
            <div className="text-[11px] text-[#686862] mt-0.5">Cyclomatic complexity & smells</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#E4E4DE] shadow-sm">
            <div className="text-xs text-[#686862]">Dead Code & Export Scan</div>
            <div className="text-2xl font-extrabold text-[#16803C] mt-1">Automated</div>
            <div className="text-[11px] text-[#686862] mt-0.5">Unused exports & functions</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#E4E4DE] shadow-sm">
            <div className="text-xs text-[#686862]">Mobile WhatsApp Push</div>
            <div className="text-2xl font-extrabold text-[#181816] mt-1">Real-Time</div>
            <div className="text-[11px] text-[#686862] mt-0.5">Instant phone alerts</div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-[#E4E4DE] shadow-sm">
            <div className="text-xs text-[#686862]">AI Code Refactor Agent</div>
            <div className="text-2xl font-extrabold text-[#181816] mt-1">Permission-Based</div>
            <div className="text-[11px] text-[#686862] mt-0.5">User approval workflow</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#E4E4DE] bg-white text-center text-xs text-[#686862] font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} RepoMind Platform Inc. Enterprise Software Intelligence.</div>
          <div className="flex items-center space-x-4">
            <a href="#privacy" className="hover:text-[#181816]">Privacy</a>
            <a href="#terms" className="hover:text-[#181816]">Terms</a>
            <a href="#security" className="hover:text-[#181816]">Security</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
