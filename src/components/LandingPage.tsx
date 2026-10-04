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
    <div className="min-h-screen bg-[#090611] text-[#F8F7FF] flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* Commercial Top Navigation Bar */}
      <nav className="h-20 border-b border-[#2A1B42] px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#4C1D95] flex items-center justify-center shadow-lg shadow-[#7C3AED]/20 border border-[#8B5CF6]/30">
            <span className="text-xl">🧠</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-xl tracking-tight text-white">RepoMind</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/30">Platform</span>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-[#A9A1B8]">
          <a href="#features" className="hover:text-[#F8F7FF] transition">Capabilities</a>
          <a href="#architecture" className="hover:text-[#F8F7FF] transition">Architecture</a>
          <a href="#security" className="hover:text-[#F8F7FF] transition">Security</a>
          <a href="#enterprise" className="hover:text-[#F8F7FF] transition">Enterprise</a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={onExploreDemo}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#A9A1B8] hover:text-white bg-[#110B1F] hover:bg-[#171026] border border-[#2A1B42] transition"
          >
            ▶ Explore Platform
          </button>
          <button
            onClick={onStartAnalysis}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white text-xs font-extrabold shadow-lg shadow-[#7C3AED]/25 transition flex items-center space-x-2"
          >
            <span>🚀 Start Free</span>
          </button>
        </div>
      </nav>

      {/* Commercial Hero Section */}
      <section className="pt-20 pb-24 px-6 max-w-5xl mx-auto text-center relative">
        {/* Ambient subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[280px] bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Category Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#110B1F] border border-[#2A1B42] text-[#C4B5FD] text-xs font-semibold mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
          <span>Repository Intelligence & Engineering Productivity Platform</span>
        </div>

        {/* Primary Hero Headings */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
          Understand your codebase.<br />
          <span className="bg-gradient-to-r from-[#A78BFA] via-[#C4B5FD] to-white bg-clip-text text-transparent">Improve your software.</span><br />
          Ship with confidence.
        </h1>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-[#A9A1B8] max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          RepoMind gives engineering teams a complete view of repository health, technical debt, dependencies, testing coverage and development risks.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartAnalysis}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-extrabold text-base shadow-xl shadow-[#7C3AED]/30 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>🚀 Start Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#110B1F] hover:bg-[#171026] text-[#F8F7FF] font-bold text-base border border-[#2A1B42] transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>▶ Explore Platform</span>
          </button>
        </div>

        {/* Clean Enterprise Product Viewport Mockup */}
        <div id="features" className="relative rounded-2xl p-1.5 bg-[#2A1B42] shadow-2xl backdrop-blur-xl max-w-5xl mx-auto overflow-hidden">
          <div className="bg-[#110B1F] rounded-xl p-6 border border-[#2A1B42] text-left">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#2A1B42]">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <span className="text-xs font-mono text-[#A9A1B8] ml-2">repomind.engineering/dashboard</span>
              </div>
              <div className="text-[11px] font-mono bg-[#171026] text-[#C4B5FD] px-3 py-1 rounded-lg border border-[#2A1B42]">
                Repository Health: 🟢 87 / 100 (Healthy)
              </div>
            </div>

            {/* Dashboard Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#171026] border border-[#2A1B42]">
                <div className="text-xs font-semibold text-[#A9A1B8]">Technical Debt</div>
                <div className="text-2xl font-extrabold text-[#F8F7FF] mt-1">18 Issues</div>
                <div className="text-[11px] text-[#A9A1B8] mt-1">Est. 24 payback hours</div>
              </div>
              <div className="p-4 rounded-xl bg-[#171026] border border-[#2A1B42]">
                <div className="text-xs font-semibold text-[#A9A1B8]">Security Health</div>
                <div className="text-2xl font-extrabold text-[#F8F7FF] mt-1">94 / 100</div>
                <div className="text-[11px] text-[#A9A1B8] mt-1">1 Vulnerability flagged</div>
              </div>
              <div className="p-4 rounded-xl bg-[#171026] border border-[#2A1B42]">
                <div className="text-xs font-semibold text-[#A9A1B8]">Test Coverage</div>
                <div className="text-2xl font-extrabold text-[#F8F7FF] mt-1">78%</div>
                <div className="text-[11px] text-[#A9A1B8] mt-1">Pytest mock generator</div>
              </div>
              <div className="p-4 rounded-xl bg-[#171026] border border-[#2A1B42]">
                <div className="text-xs font-semibold text-[#A9A1B8]">Dependencies</div>
                <div className="text-2xl font-extrabold text-[#F8F7FF] mt-1">12 Packages</div>
                <div className="text-[11px] text-[#A9A1B8] mt-1">2 Updates available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Capabilities Section */}
      <section id="architecture" className="py-20 px-6 border-t border-[#2A1B42] bg-[#110B1F]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-3">
              Built for Engineering Rigor & Production Velocity
            </h2>
            <p className="text-sm text-[#A9A1B8]">
              Automated static analysis, dependency intelligence, and step-by-step AI pair programming.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#171026] border border-[#2A1B42] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 text-[#A78BFA] flex items-center justify-center border border-[#7C3AED]/30">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">AST Static Analysis</h3>
              <p className="text-xs text-[#A9A1B8] leading-relaxed">
                Parses source code into Abstract Syntax Trees to measure cyclomatic complexity, maintainability index, and architectural coupling.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#171026] border border-[#2A1B42] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 text-[#A78BFA] flex items-center justify-center border border-[#7C3AED]/30">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Permission-Based Code Agent</h3>
              <p className="text-xs text-[#A9A1B8] leading-relaxed">
                Inspects bugs, proposes refactoring patches, and asks for explicit engineer approval before modifying any repository file.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#171026] border border-[#2A1B42] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 text-[#A78BFA] flex items-center justify-center border border-[#7C3AED]/30">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Multi-Repo Intelligence</h3>
              <p className="text-xs text-[#A9A1B8] leading-relaxed">
                Supports analyzing custom GitHub repository URLs, monorepos, and uploaded source archives with exportable PDF & JSON reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2A1B42] py-8 px-6 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#A9A1B8]">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <span>🧠 RepoMind</span>
          <span>— Repository Intelligence & Engineering Productivity Platform</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-[#F8F7FF] transition">Privacy</a>
          <a href="#" className="hover:text-[#F8F7FF] transition">Terms</a>
          <a href="#" className="hover:text-[#F8F7FF] transition">Documentation</a>
          <a href="#" className="hover:text-[#F8F7FF] transition">GitHub</a>
        </div>
      </footer>

    </div>
  );
};
