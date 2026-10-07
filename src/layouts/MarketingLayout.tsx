import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, ShieldCheck, Terminal, Zap, Globe } from 'lucide-react';

export const MarketingLayout: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      
      {/* 1. Aura Background (Fixed, z-0) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-purple-600/10 rounded-full blur-3xl opacity-70 filter brightness-50 saturate-50 blur-sm animate-pulse" />
      </div>

      {/* 2. SVG 64x64 Grid Pattern (Fixed, -z-10) */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.03] pointer-events-none" />

      {/* 3. Sticky Navigation Bar */}
      <nav className="h-20 border-b border-white/10 px-6 lg:px-12 flex items-center justify-between max-w-7xl mx-auto w-full bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-50 shadow-2xl">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20 transition group-hover:scale-105 border border-white/20">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-xl tracking-tight text-white font-mono">RepoMind</span>
            <span className="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/30">AI v2.5</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-semibold text-neutral-400">
          <Link to="/product" className="hover:text-white transition">Product</Link>
          <Link to="/features" className="hover:text-white transition">Features</Link>
          <Link to="/solutions" className="hover:text-white transition">Solutions</Link>
          <Link to="/security" className="hover:text-white transition">Security</Link>
          <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link to="/docs" className="hover:text-white transition">Docs</Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>AST Engine Online</span>
          </div>

          {user ? (
            <Link
              to="/app"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/25 backdrop-blur-xl hover:-translate-y-0.5 transition-all flex items-center space-x-2 border border-blue-400/30"
            >
              <span>Go to App Dashboard →</span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl hover:-translate-y-0.5 transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-lg shadow-blue-600/25 backdrop-blur-xl hover:-translate-y-0.5 transition-all flex items-center space-x-2 border border-blue-400/30"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Outlet */}
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 bg-neutral-950/90 text-xs text-neutral-400 font-sans relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Statement */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                🧠
              </div>
              <span className="font-extrabold text-base text-white font-mono">RepoMind AI</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-normal">
              Commercial-grade SaaS Software Repository Intelligence & Technical Debt Analysis Platform.
            </p>
            <div className="flex items-center space-x-3 text-neutral-400 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="GitHub">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <div className="font-bold text-white mb-4 uppercase text-[11px] font-mono tracking-wider">Product & Engine</div>
            <ul className="space-y-2.5 font-medium">
              <li><Link to="/product" className="hover:text-white transition">Overview</Link></li>
              <li><Link to="/features" className="hover:text-white transition">repowise-dev AST Parser</Link></li>
              <li><Link to="/security" className="hover:text-white transition">codebase-intelligence AI Agent</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition">Enterprise Pricing Tiers</Link></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <div className="font-bold text-white mb-4 uppercase text-[11px] font-mono tracking-wider">Solutions & Audits</div>
            <ul className="space-y-2.5 font-medium">
              <li><Link to="/solutions" className="hover:text-white transition">Engineering Leadership</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition">CTO Risk Remediation</Link></li>
              <li><Link to="/docs" className="hover:text-white transition">Technical Debt Payback</Link></li>
              <li><Link to="/docs" className="hover:text-white transition">Pytest Coverage Generator</Link></li>
            </ul>
          </div>

          {/* Infrastructure Links */}
          <div>
            <div className="font-bold text-white mb-4 uppercase text-[11px] font-mono tracking-wider">Infrastructure & Legal</div>
            <ul className="space-y-2.5 font-medium">
              <li><Link to="/about" className="hover:text-white transition">About RepoMind</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Engineering</Link></li>
              <li><Link to="/security" className="hover:text-white transition">SOC2 Security Compliance</Link></li>
              <li><Link to="/login" className="hover:text-white transition">Developer Login</Link></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div>© {new Date().getFullYear()} RepoMind Platform Inc. All rights reserved. High Fidelity AI Infrastructure.</div>
          <div className="flex items-center space-x-6 text-neutral-400">
            <Link to="/security" className="hover:text-white transition">SOC2 & Security</Link>
            <Link to="/docs" className="hover:text-white transition">API Specification</Link>
            <span className="text-emerald-400 font-bold">● System Operational</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
