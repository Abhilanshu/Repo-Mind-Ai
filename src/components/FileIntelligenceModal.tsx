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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#130d24] border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-purple-950/40 hover:bg-purple-900/40 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white font-mono">{filename}</h2>
            <p className="text-xs text-slate-300">File-Level Engineering Intelligence & Refactoring Diagnosis</p>
          </div>
        </div>

        {/* Score & Health Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs">
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
            <div className="text-slate-400">Health Score</div>
            <div className="text-xl font-extrabold text-amber-400 mt-0.5">61 / 100</div>
          </div>
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
            <div className="text-slate-400">Complexity</div>
            <div className="text-xl font-extrabold text-rose-400 mt-0.5">High</div>
          </div>
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
            <div className="text-slate-400">Lines of Code</div>
            <div className="text-xl font-extrabold text-white mt-0.5">339 LOC</div>
          </div>
          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40">
            <div className="text-slate-400">Functions</div>
            <div className="text-xl font-extrabold text-purple-300 mt-0.5">13 functions</div>
          </div>
        </div>

        {/* AI Structural Explanation */}
        <div className="p-4 rounded-2xl bg-purple-950/50 border border-purple-800/40 text-xs mb-6 space-y-2">
          <div className="flex items-center space-x-2 text-purple-300 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>🤖 AI File Explanation</span>
          </div>
          <p className="text-slate-200 leading-relaxed italic">
            "This file has accumulated responsibilities across execution dispatching, state manager synchronization, and processor error handling. Splitting these responsibilities into sub-handlers would improve maintainability and prevent silent thread lockups."
          </p>
        </div>

        {/* Bottom Action CTAs */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-purple-900/40">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 text-slate-300 hover:text-white text-xs font-bold border border-purple-800/40 transition"
          >
            Close
          </button>
          <button
            onClick={() => onGenerateRefactor(filename)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-extrabold transition shadow-lg shadow-purple-600/30 flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span>✨ Generate Refactoring Plan</span>
          </button>
        </div>

      </div>
    </div>
  );
};
