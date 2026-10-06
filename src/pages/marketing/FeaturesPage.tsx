import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Network, ShieldCheck, TestTube2, Bot, Calendar, FileText, ArrowRight } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto font-sans space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">
          Engineering Capabilities
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2937]">Full Feature Matrix</h1>
        <p className="text-sm text-[#4B5563]">Everything you need to quantify code quality, fix security risks, and manage software maintenance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <div className="flex items-center space-x-3 text-[#6D4AFF] font-extrabold text-lg">
            <Cpu className="w-6 h-6" />
            <h3>Static AST Analysis & Complexity Engine</h3>
          </div>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Evaluates cyclomatic complexity markers, maintainability index (0–100), and code smells across multi-file repositories without compilation overhead.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <div className="flex items-center space-x-3 text-[#6D4AFF] font-extrabold text-lg">
            <Network className="w-6 h-6" />
            <h3>Circular Dependency Topology Grapher</h3>
          </div>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Parses source imports to visualize interactive module layer graphs and highlight circular import risks before build errors occur.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <div className="flex items-center space-x-3 text-[#16803C] font-extrabold text-lg">
            <ShieldCheck className="w-6 h-6" />
            <h3>OWASP Security Scanner</h3>
          </div>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Automated static checks for command injection risks, hardcoded credentials, unhandled exception callbacks, and missing CORS headers.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <div className="flex items-center space-x-3 text-[#B7791F] font-extrabold text-lg">
            <Bot className="w-6 h-6" />
            <h3>Permission-Gated AI Code Refactoring Agent</h3>
          </div>
          <p className="text-xs text-[#4B5563] leading-relaxed">
            Generates refactoring patches and requires explicit developer approval ([Approve & Apply Fix]) before making any changes to user source files.
          </p>
        </div>
      </div>
    </div>
  );
};
