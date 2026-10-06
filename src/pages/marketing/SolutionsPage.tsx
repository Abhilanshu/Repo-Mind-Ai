import React from 'react';
import { Link } from 'react-router-dom';
import { UserCheck, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto font-sans space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">
          Industry Solutions
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2937]">Built for Engineering Leaders</h1>
        <p className="text-sm text-[#4B5563]">Tailored solution workflows for engineering managers, architects, and lead developers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <UserCheck className="w-8 h-8 text-[#6D4AFF]" />
          <h3 className="text-base font-extrabold text-[#1F2937]">For Engineering Managers</h3>
          <p className="text-xs text-[#4B5563] leading-relaxed">Quantify technical debt payback effort in hours, track health trends over time, and export sprint backlog tasks directly to Jira.</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <Building2 className="w-8 h-8 text-[#16803C]" />
          <h3 className="text-base font-extrabold text-[#1F2937]">For Software Architects</h3>
          <p className="text-xs text-[#4B5563] leading-relaxed">Visualize interactive module call graphs, identify circular dependencies, and prevent monolithic code complexity.</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <ShieldCheck className="w-8 h-8 text-[#B7791F]" />
          <h3 className="text-base font-extrabold text-[#1F2937]">For Security Auditors</h3>
          <p className="text-xs text-[#4B5563] leading-relaxed">Detect vulnerabilities across multi-language repositories, enforce OWASP compliance, and audit package supply chains.</p>
        </div>
      </div>
    </div>
  );
};
