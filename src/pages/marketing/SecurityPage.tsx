import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle2, Key, Building2 } from 'lucide-react';

export const SecurityPage: React.FC = () => {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto font-sans space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#EAF7EF] text-[#16803C] border border-[#C6ECD3]">
          Security & Compliance
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2937]">Enterprise-Grade Security</h1>
        <p className="text-sm text-[#4B5563]">How RepoMind protects your repository source code, credentials, and access policies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <Lock className="w-8 h-8 text-[#6D4AFF]" />
          <h3 className="text-base font-extrabold text-[#1F2937]">Zero Code Persistence</h3>
          <p className="text-xs text-[#4B5563]">Source files are analyzed strictly in-memory or on local AST workers. Code is never stored or used to train third-party AI models.</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <Building2 className="w-8 h-8 text-[#16803C]" />
          <h3 className="text-base font-extrabold text-[#1F2937]">Okta & Azure SAML SSO</h3>
          <p className="text-xs text-[#4B5563]">Enterprise Single Sign-On integration enforcing corporate identity provider policies, MFA, and SAML 2.0 protocol authentication.</p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <ShieldCheck className="w-8 h-8 text-[#B7791F]" />
          <h3 className="text-base font-extrabold text-[#1F2937]">OWASP Static Scanner</h3>
          <p className="text-xs text-[#4B5563]">Pre-built rule sets auditing command injection, unsafe subprocesses, CORS wildcard headers, and exposed API tokens.</p>
        </div>
      </div>
    </div>
  );
};
