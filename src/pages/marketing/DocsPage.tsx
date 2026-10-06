import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Terminal, Server } from 'lucide-react';

export const DocsPage: React.FC = () => {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto font-sans space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-[#EEE9FF] text-[#6D4AFF] border border-[#D8CAFF]">
          Documentation
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1F2937]">RepoMind Developer Documentation</h1>
        <p className="text-sm text-[#4B5563]">API reference, AST analysis rules, Express/Mongoose server setup, and WhatsApp webhook integration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <div className="flex items-center space-x-2 font-extrabold text-[#1F2937] text-sm">
            <Terminal className="w-5 h-5 text-[#6D4AFF]" />
            <span>Express REST API Endpoints</span>
          </div>
          <div className="bg-[#F7F5F2] p-3 rounded-xl border border-[#E8E5DF] font-mono space-y-1.5 text-[11px]">
            <div><span className="text-[#16803C] font-bold">POST</span> /api/auth/register</div>
            <div><span className="text-[#16803C] font-bold">POST</span> /api/auth/login</div>
            <div><span className="text-[#6D4AFF] font-bold">GET</span> /api/auth/me</div>
            <div><span className="text-[#6D4AFF] font-bold">GET</span> /api/repositories</div>
            <div><span className="text-[#16803C] font-bold">POST</span> /api/whatsapp/send</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-[#E8E5DF] shadow-md space-y-3">
          <div className="flex items-center space-x-2 font-extrabold text-[#1F2937] text-sm">
            <Server className="w-5 h-5 text-[#16803C]" />
            <span>Mongoose ODM Models</span>
          </div>
          <p className="text-[#4B5563]">MongoDB collections for storing analyzed repositories, technical debt issues, security findings, user accounts, and WhatsApp alert configs.</p>
        </div>
      </div>
    </div>
  );
};
