import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, Sparkles, Code2, ArrowRight, X } from 'lucide-react';
import { SecurityFinding } from '../types/repomind';

interface SecurityDashboardProps {
  findings: SecurityFinding[];
  onGenerateFix: (finding: SecurityFinding) => void;
}

export const SecurityDashboard: React.FC<SecurityDashboardProps> = ({
  findings,
  onGenerateFix
}) => {
  const [selectedFinding, setSelectedFinding] = useState<SecurityFinding | null>(findings[0] || null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filtered = filterSeverity === 'all' 
    ? findings 
    : findings.filter(f => f.severity === filterSeverity);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel rounded-2xl p-5">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-extrabold text-white">🔐 Security Center & Vulnerability Risk Scanner</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Static security analysis for command injection, cryptographic weakness, and file permission exploits.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {['all', 'critical', 'high', 'medium', 'low'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                filterSeverity === sev
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-purple-950/40 text-slate-400 hover:text-white border border-purple-800/40'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Main List & Fix Inspector Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Vulnerabilities List (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedFinding(item)}
              className={`glass-panel rounded-2xl p-5 cursor-pointer transition-all duration-200 border text-left ${
                selectedFinding?.id === item.id 
                  ? 'border-purple-400 bg-purple-900/40 shadow-xl shadow-purple-500/10' 
                  : 'hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    item.severity === 'critical' ? 'bg-rose-500 animate-ping' :
                    item.severity === 'high' ? 'bg-orange-500' :
                    item.severity === 'medium' ? 'bg-amber-400' : 'bg-sky-400'
                  }`} />
                  <span className="text-xs font-mono uppercase font-bold text-slate-300">{item.id}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    item.severity === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                    item.severity === 'high' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.severity}
                  </span>
                </div>

                <div className="text-xs font-mono text-purple-300">
                  {item.file}:{item.line}
                </div>
              </div>

              <h3 className="text-sm font-extrabold text-white mt-2">{item.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-snug">{item.explanation}</p>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-purple-900/30">
                <span>Impact: {item.impact.substring(0, 50)}...</span>
                <span className="text-purple-400 font-bold hover:underline">Inspect Fix →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Vulnerability AI Patch Inspector */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between">
          {selectedFinding ? (
            <div className="space-y-4 text-xs">
              <div className="pb-3 border-b border-purple-900/40">
                <span className="text-[10px] uppercase font-bold font-mono text-rose-400">Security Vulnerability Inspector</span>
                <h3 className="text-base font-extrabold text-white mt-1">{selectedFinding.title}</h3>
                <p className="text-slate-300 font-mono text-[11px] mt-0.5">{selectedFinding.file} (Line {selectedFinding.line})</p>
              </div>

              <div>
                <div className="font-bold text-slate-200 mb-1">What is the problem?</div>
                <p className="text-slate-300 leading-relaxed bg-purple-950/40 p-3 rounded-xl border border-purple-800/40">
                  {selectedFinding.explanation}
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-200 mb-1">Why does it matter?</div>
                <p className="text-slate-300 leading-relaxed bg-rose-950/30 p-3 rounded-xl border border-rose-500/30">
                  {selectedFinding.impact}
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-200 mb-1">How can I fix it?</div>
                <p className="text-emerald-300 leading-relaxed bg-emerald-950/30 p-3 rounded-xl border border-emerald-500/30 font-mono text-[11px]">
                  {selectedFinding.recommendedFix}
                </p>
              </div>

              {selectedFinding.codeSnippet && (
                <div>
                  <div className="font-bold text-slate-200 mb-1 font-mono">Vulnerable Code Snippet:</div>
                  <pre className="p-3 rounded-xl bg-[#090612] text-rose-300 font-mono text-[11px] overflow-x-auto border border-rose-900/40">
                    {selectedFinding.codeSnippet}
                  </pre>
                </div>
              )}

              <button
                onClick={() => onGenerateFix(selectedFinding)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold transition shadow-lg shadow-purple-600/30 flex items-center justify-center space-x-2 text-xs"
              >
                <Sparkles className="w-4 h-4 text-purple-200" />
                <span>✨ Generate Automated AI Patch</span>
              </button>
            </div>
          ) : (
            <div className="text-xs text-slate-400 text-center my-auto">
              Select a security finding to inspect fix recommendations.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
