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
  Network,
  GitBranch,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Code2,
  Terminal,
  Check,
  Globe,
  Layers,
  Activity
} from 'lucide-react';
import { GetStartedButton } from './GetStartedButton';

interface LandingPageProps {
  onStartAnalysis?: () => void;
  onExploreDemo?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = () => {
  const navigate = useNavigate();

  // Testimonial Data from Asset Map
  const testimonialsRow1 = [
    {
      name: "Alex Rivera",
      role: "VP of Engineering at Vercel",
      avatar: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/61cab6ed-2661-4fa3-9b88-51829e79b908_100w.webp",
      text: "RepoMind reduced our technical debt payback cycle by 65%. The AST engine catches structural complexity before pull requests merge."
    },
    {
      name: "Sarah Chen",
      role: "Principal Architect at Stripe",
      avatar: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2f999a94-436d-4786-8a0a-1a877d130db5_100w.webp",
      text: "The permission-gated AI code agent is game changing. Developers review proposed patches with full control before touching repo files."
    },
    {
      name: "Marcus Vance",
      role: "Tech Lead at Datadog",
      avatar: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/08b00610-8488-466d-9799-a1717325ceee_100w.webp",
      text: "We went from guessing refactoring ROI to empirical quantitative payback metrics. RepoMind is now essential in our sprint planning."
    }
  ];

  const testimonialsRow2 = [
    {
      name: "Elena Rostova",
      role: "Head of Infrastructure at Supabase",
      avatar: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4c9aa348-18e3-469b-8bc6-ebacbe2ea891_100w.webp",
      text: "Zero hardcoded assumptions. The AST parser mapped 400+ microservices in under 3 minutes with full dependency graph visualization."
    },
    {
      name: "David Kim",
      role: "Staff Security Engineer at Coinbase",
      avatar: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/67ea0bb9-06b2-4d2b-aa90-b184f4ecf554_100w.webp",
      text: "Automated WhatsApp notifications for security findings keep our team instantly alerted to critical vulnerabilities 24/7."
    },
    {
      name: "Rachel Foster",
      role: "Director of DevOps at Linear",
      avatar: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/357cb3d1-9f65-4810-884b-f0072a65193d_1600w.webp",
      text: "The combination of repowise-dev AST parsing and Pytest generation eliminated 40+ hours of manual code review per month."
    }
  ];

  // Chart SLA Bar Data
  const slaBars = [92, 96, 98, 97, 99, 98, 97];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between overflow-x-hidden font-sans antialiased relative">
      
      {/* ---------------------------------------------------- */}
      {/* SECTION 1: HERO & BENTO GRID                         */}
      {/* ---------------------------------------------------- */}
      <section className="pt-16 pb-12 px-6 max-w-7xl mx-auto text-center relative z-10 animate-fade-slide-in">
        
        {/* Status Pill */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium mb-8 backdrop-blur-xl hover:border-blue-500/50 transition">
          <svg className="w-4 h-4 text-blue-400 animate-spin" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
          </svg>
          <span className="text-blue-400 font-bold font-mono">New v2.5</span>
          <span className="text-neutral-300">Powering Next-Gen Repository Intelligence</span>
        </div>

        {/* Primary Hero Heading */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[1.05] mb-8 text-white">
          Powering the next wave of<br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            repository intelligence.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-neutral-400 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
          RepoMind analyzes your codebase AST, detects structural technical debt, scans for OWASP vulnerabilities, ranks remediation priorities by ROI, and provides a permission-gated AI refactoring agent.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/app"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-lg shadow-blue-600/30 backdrop-blur-xl hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2.5 border border-blue-400/30"
          >
            <span>Go to App Dashboard</span>
            <ArrowRight className="w-5 h-5 text-white" />
          </Link>

          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-extrabold text-base border border-white/10 backdrop-blur-xl hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Get Started Free</span>
          </Link>

          {/* Liquid-Chrome Tactile WebGL Pill */}
          <div 
            onClick={() => navigate('/register')}
            className="cursor-pointer w-[240px] h-[75px] transition-transform hover:scale-[1.03] active:scale-[0.97] hidden lg:block"
            title="Interactive liquid-chrome WebGL button"
          >
            <GetStartedButton />
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 2: BENTO CARDS (h-[800px] 12-Column Grid)     */}
        {/* ---------------------------------------------------- */}
        <div 
          className="grid grid-cols-12 gap-6 h-[800px] overflow-hidden text-left relative"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)' }}
        >
          
          {/* Card 1: Stat Card (Col Span 3) */}
          <div className="col-span-12 md:col-span-3 bg-white text-neutral-900 rounded-3xl p-6 flex flex-col justify-between shadow-2xl border-gradient">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">Global Customer Base</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-6xl font-extrabold tracking-tighter text-neutral-900">140+</div>
              <div className="text-xs font-bold text-emerald-700 mt-1 flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>+98.4% Refactoring Precision</span>
              </div>
            </div>
            <div className="pt-6 border-t border-neutral-200">
              <p className="text-xs text-neutral-600 leading-relaxed font-medium">
                Active enterprise software repositories evaluated continuously across GitHub and GitLab pipelines.
              </p>
            </div>
          </div>

          {/* Card 2: Edge Runtime Code Card (Col Span 6) */}
          <div className="col-span-12 md:col-span-6 bg-neutral-900/80 border border-white/10 backdrop-blur-xl rounded-3xl p-6 font-mono text-xs overflow-hidden flex flex-col justify-between shadow-2xl relative border-gradient">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-neutral-400">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span className="text-white font-bold">repomind.config.ts</span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">Edge AST Runtime</span>
            </div>

            <pre className="text-emerald-400 text-[11px] leading-relaxed overflow-x-auto py-4">
{`import { defineConfig } from '@repomind/core';

export default defineConfig({
  astEngine: 'repowise-dev/repowise',
  aiAgent: 'Oussamcsc/codebase-intelligence',
  rules: ['cyclomatic', 'owasp-top-10', 'pytest-coverage'],
  permissionGate: true,
  whatsappNotifier: { enabled: true, mode: 'callmebot' }
});`}
            </pre>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-neutral-400">
              <span className="flex items-center space-x-1.5 text-blue-400 font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>Zero Hardcoded Assumptive State</span>
              </span>
              <span>Compile time: 14ms</span>
            </div>
          </div>

          {/* Card 3: Delivery Success & SLA Chart (Col Span 3) */}
          <div className="col-span-12 md:col-span-3 bg-neutral-900/80 border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex flex-col justify-between shadow-2xl border-gradient">
            <div>
              <div className="text-[11px] font-mono font-bold uppercase text-neutral-400 mb-1">Analysis SLA</div>
              <div className="text-4xl font-extrabold text-white font-mono">97.8%</div>
              <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center space-x-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Static & Dynamic Audit</span>
              </div>
            </div>

            {/* Custom Bar Chart Simulation */}
            <div className="my-6">
              <div className="flex items-end justify-between h-24 gap-1.5 pt-2">
                {slaBars.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                    <div 
                      className="w-full bg-blue-500 hover:bg-blue-400 rounded-t-md transition-all duration-300"
                      style={{ height: `${val}%` }}
                    />
                    <span className="text-[9px] font-mono text-neutral-500">D{idx+1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[10px] font-mono text-neutral-400 text-center border-t border-white/10 pt-3">
              7-Day Continuous Inspection Window
            </div>
          </div>

          {/* Card 4: Global Deployment Card (Col Span 6) */}
          <div className="col-span-12 md:col-span-6 bg-neutral-900/80 border border-white/10 backdrop-blur-xl rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[300px] border-gradient">
            <img 
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/d25a1767-0ea8-4aac-b981-6afd67dc79a6_800w.webp" 
              alt="Global Network"
              className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none mix-blend-luminosity"
            />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-blue-400">Global Coverage</span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">Multi-Region AST Ingestion</h3>
              </div>
              <Globe className="w-6 h-6 text-blue-400 animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-wrap gap-2 my-6">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/40">🇯🇵 Tokyo, Japan</span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/40">🇨🇦 Toronto, Canada</span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/40">🇵🇹 Lisbon, Portugal</span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/40">🇺🇸 San Francisco, USA</span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-500/40">🇬🇧 London, UK</span>
            </div>

            <div className="relative z-10 text-xs text-neutral-400 font-mono">
              ⚡ Distributed AST analysis nodes operational across 5 global regions.
            </div>
          </div>

          {/* Card 5: Orbital AI Engine Card (Col Span 6) */}
          <div className="col-span-12 md:col-span-6 bg-neutral-900/80 border border-white/10 backdrop-blur-xl rounded-3xl p-6 flex items-center justify-center relative overflow-hidden min-h-[300px] border-gradient">
            
            {/* Concentric Orbit Circles */}
            <div className="absolute w-[440px] h-[440px] rounded-full border border-white/5 animate-spin" style={{ animationDuration: '40s' }} />
            <div className="absolute w-[320px] h-[320px] rounded-full border border-blue-500/20 animate-pulse" />
            <div className="absolute w-[200px] h-[200px] rounded-full border border-purple-500/25 animate-pulse" />

            {/* Center Brain Icon */}
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-2xl shadow-blue-500/40 mx-auto mb-3 border border-white/20">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-lg font-extrabold text-white">RepoMind AI Core</h4>
              <p className="text-xs text-neutral-400 font-mono mt-1">Permission-Gated Code Refactoring Engine</p>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: MARQUEE TESTIMONIALS                      */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 relative z-10 max-w-7xl mx-auto px-6">
        <div className="border-gradient border border-white/10 bg-neutral-900/60 backdrop-blur-2xl rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          
          {/* Blue Glow Top Right */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
              Verified Engineering Reviews
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-3">Trusted by Engineering Leaders</h2>
          </div>

          {/* Marquee Row 1 (LTR Animation with Duplicate Blocks for Infinite Loop) */}
          <div className="overflow-hidden mb-6 flex">
            <div className="flex space-x-6 animate-marquee-ltr">
              {[...testimonialsRow1, ...testimonialsRow1].map((t, idx) => (
                <div key={idx} className="w-[420px] bg-white/5 ring-1 ring-white/10 backdrop-blur-md rounded-2xl p-6 shrink-0 flex flex-col justify-between">
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal mb-4">
                    "{t.text}"
                  </p>
                  <div className="flex items-center space-x-3 pt-3 border-t border-white/10">
                    <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-white/20" />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <span>{t.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 (RTL Animation with Duplicate Blocks for Infinite Loop) */}
          <div className="overflow-hidden flex">
            <div className="flex space-x-6 animate-marquee-rtl">
              {[...testimonialsRow2, ...testimonialsRow2].map((t, idx) => (
                <div key={idx} className="w-[420px] bg-white/5 ring-1 ring-white/10 backdrop-blur-md rounded-2xl p-6 shrink-0 flex flex-col justify-between">
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal mb-4">
                    "{t.text}"
                  </p>
                  <div className="flex items-center space-x-3 pt-3 border-t border-white/10">
                    <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-white/20" />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <span>{t.name}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <div className="text-[10px] font-mono text-neutral-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 4: REPOMIND RISK & TRADING SOLUTION          */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Real-Time Risk Signal Simulation
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-3">Empirical Technical Debt & ROI Analysis</h2>
        </div>

        {/* Candlestick & Signal Overlay Visual */}
        <div className="bg-neutral-900/90 border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-2xl mb-12 border-gradient min-h-[260px] flex items-end">
          
          {/* Absolute Signal Markers */}
          <div className="absolute top-6 left-6 backdrop-blur-md bg-black/70 border border-emerald-500/30 text-emerald-400 text-xs px-3.5 py-2 rounded-xl font-mono flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>REMEDIATED: +$1,240 ROI / AST Patch e8f910a</span>
          </div>

          <div className="absolute top-6 right-6 backdrop-blur-md bg-black/70 border border-rose-500/30 text-rose-400 text-xs px-3.5 py-2 rounded-xl font-mono flex items-center space-x-2">
            <TrendingDown className="w-4 h-4 text-rose-400" />
            <span>TECHNICAL DEBT FLAG: -28h Payback Delta</span>
          </div>

          {/* Vertical Bars Simulation */}
          <div className="w-full flex items-end justify-between gap-2 h-40 pt-8">
            {[
              { type: 'rose', val: 40 },
              { type: 'emerald', val: 65 },
              { type: 'rose', val: 30 },
              { type: 'emerald', val: 85 },
              { type: 'emerald', val: 95 },
              { type: 'rose', val: 25 },
              { type: 'emerald', val: 90 },
              { type: 'emerald', val: 100 },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full">
                <div 
                  className={`w-full rounded-md transition-all duration-300 ${
                    bar.type === 'emerald' ? 'bg-emerald-500 shadow-md shadow-emerald-500/30' : 'bg-rose-500 shadow-md shadow-rose-500/30'
                  }`}
                  style={{ height: `${bar.val}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 3-Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          
          {/* Problem Column */}
          <div className="p-6 rounded-3xl bg-neutral-900/60 border border-rose-500/20 text-left space-y-3">
            <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs font-bold uppercase">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              <span>Problem: Technical Debt</span>
            </div>
            <div className="text-2xl font-extrabold text-white">-$420,000 / Sprint</div>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Accumulated code smells, circular dependencies, and missing tests slow feature velocity and increase incident rates.
            </p>
          </div>

          {/* Challenge Column */}
          <div className="p-6 rounded-3xl bg-neutral-900/60 border border-amber-500/20 text-left space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-mono text-xs font-bold uppercase">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Challenge: Manual Audits</span>
            </div>
            <div className="text-2xl font-extrabold text-white">High Latency</div>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Manual architecture reviews require dozens of engineering hours and miss subtle security vulnerabilities.
            </p>
          </div>

          {/* Solution Column */}
          <div className="p-6 rounded-3xl bg-neutral-900/60 border border-emerald-500/30 text-left space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Solution: RepoMind AST</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400">+$1,240,000 ROI</div>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Automated AST static analysis, permission-gated AI refactoring, and Pytest coverage suites deliver 14x faster releases.
            </p>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 5: DUAL GITHUB ENGINES & FINAL CTA           */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 relative z-10 max-w-7xl mx-auto px-6">
        <div className="border-gradient border border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-950 to-blue-950/40 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-mono font-bold border border-blue-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Dual Engine Open Source Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Transform Your Engineering Velocity Today
          </h2>

          <p className="text-sm text-neutral-400 max-w-2xl mx-auto font-normal mb-8 leading-relaxed">
            Join hundreds of engineering teams using RepoMind AI to inspect repository health, automate Pytest coverage, and remediate technical debt securely.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/app"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-blue-600/30 backdrop-blur-xl hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 border border-blue-400/30"
            >
              <span>Go to App Dashboard</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </Link>

            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-base border border-white/20 backdrop-blur-xl hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Get Started Free</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};
