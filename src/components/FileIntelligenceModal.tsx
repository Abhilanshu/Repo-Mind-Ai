import React from 'react';
import { X, FileCode2, Sparkles, Code2, AlertTriangle, ShieldCheck, ArrowRight, Copy, Check } from 'lucide-react';
import { CodeQualityFile } from '../types/repomind';

interface FileIntelligenceModalProps {
  filename: string;
  onClose: () => void;
  onGenerateRefactor: (filename: string) => void;
}

export const FileIntelligenceModal: React.FC<FileIntelligenceModalProps> = ({
  filename,
  onClose,
  onGenerateRefactor
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white border border-[#E4E4DE] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 text-[#181816]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#F7F7F4] hover:bg-[#E4E4DE] text-[#686862] hover:text-[#181816] transition border border-[#E4E4DE]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#171717] flex items-center justify-center text-white shadow-md">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#181816] font-mono">{filename}</h2>
            <p className="text-xs text-[#686862]">File-Level Engineering Intelligence & Refactoring Diagnosis</p>
          </div>
        </div>

        {/* Score & Health Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs">
          <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
            <div className="text-[#686862]">Health Score</div>
            <div className="text-xl font-extrabold text-[#B7791F] mt-0.5">61 / 100</div>
          </div>
          <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
            <div className="text-[#686862]">Complexity</div>
            <div className="text-xl font-extrabold text-[#C53030] mt-0.5">High</div>
          </div>
          <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
            <div className="text-[#686862]">Lines of Code</div>
            <div className="text-xl font-extrabold text-[#181816] mt-0.5">339 LOC</div>
          </div>
          <div className="p-3 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE]">
            <div className="text-[#686862]">Functions</div>
            <div className="text-xl font-extrabold text-[#181816] mt-0.5">13 functions</div>
          </div>
        </div>

        {/* AI Structural Explanation */}
        <div className="p-4 rounded-2xl bg-[#F7F7F4] border border-[#E4E4DE] text-xs mb-6 space-y-2">
          <div className="flex items-center space-x-2 text-[#181816] font-bold">
            <Sparkles className="w-4 h-4 text-[#16803C]" />
            <span>🤖 AI File Explanation</span>
          </div>
          <p className="text-[#686862] leading-relaxed italic">
            "This file has accumulated responsibilities across execution dispatching, state manager synchronization, and processor error handling. Splitting these responsibilities into sub-handlers would improve maintainability and prevent silent thread lockups."
          </p>
        </div>

        {/* Bottom Action CTAs */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#E4E4DE]">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#F7F7F4] hover:bg-[#E4E4DE] text-[#181816] text-xs font-bold border border-[#E4E4DE] transition"
          >
            Close
          </button>
          <button
            onClick={() => onGenerateRefactor(filename)}
            className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#313131] text-white text-xs font-extrabold transition shadow-md flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>✨ Generate Refactoring Plan</span>
          </button>
        </div>

      </div>
    </div>
  );
};
