import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Check, ShieldCheck, Cpu, Bot, Package, TestTube2 } from 'lucide-react';

export const ProductPage: React.FC = () => {
  return (
    <div className="space-y-20 py-16 px-6 max-w-7xl mx-auto font-sans">
      
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">
          Product Deep Dive
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#1F2937] tracking-tight leading-tight">
          Repository Intelligence → Engineering Impact → Prioritized Remediation
        </h1>
        <p className="text-base sm:text-lg text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
          RepoMind analyzes your software codebase without requiring build compilation, uncovering structural technical debt, security risks, and circular module dependencies.
        </p>
        <div className="pt-4 flex items-center justify-center space-x-4">
          <Link
            to="/register"
            className="px-6 py-3.5 rounded-2xl bg-[#6D4AFF] hover:bg-[#5B3BE5] text-white font-extrabold text-sm shadow-xl shadow-[#6D4AFF]/25 transition flex items-center space-x-2"
          >
            <span>Start Free Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F1F3F6] text-[#1F2937] font-extrabold text-sm border border-[#E8E5DF] transition"
          >
            Explore App Dashboard
          </Link>
        </div>
      </div>

      {/* Core Product Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EEE9FF] text-[#6D4AFF] flex items-center justify-center font-bold text-xl mb-4">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-[#1F2937]">1. Static AST Analysis</h3>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Evaluates Cyclomatic Complexity, Maintainability Index (0–100), and Halstead volume across Python, TypeScript, React, and Node.js repositories.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF7EF] text-[#16803C] flex items-center justify-center font-bold text-xl mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-[#1F2937]">2. OWASP Vulnerability Scanner</h3>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Scans for hardcoded API keys, command injection points, unhandled exception callbacks, and missing CORS security policies.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF5DD] text-[#B7791F] flex items-center justify-center font-bold text-xl mb-4">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-[#1F2937]">3. Permission-Gated AI Agent</h3>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Drafts refactoring patches and requires explicit developer approval ([Approve & Apply Fix]) before making any changes to user source files.
          </p>
        </div>
      </div>

    </div>
  );
};
