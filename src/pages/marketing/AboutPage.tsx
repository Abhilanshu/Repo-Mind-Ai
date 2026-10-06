import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Award, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto font-sans space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">
          About RepoMind AI
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2937]">Empowering Engineering Excellence</h1>
        <p className="text-sm text-[#4B5563]">Built to transform software repository complexity into clear, prioritized technical debt remediations.</p>
      </div>

      <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md max-w-3xl mx-auto space-y-4 text-xs leading-relaxed text-[#4B5563]">
        <h3 className="text-base font-extrabold text-[#1F2937]">Our Mission</h3>
        <p>
          As software engineering teams scale, understanding code health, security vulnerabilities, and architectural rot becomes an exponential challenge. RepoMind AI bridges this gap by combining static AST analysis with permission-gated AI code refactoring.
        </p>
      </div>
    </div>
  );
};
