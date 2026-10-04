import React, { useState } from 'react';
import { ShieldAlert, Sparkles } from 'lucide-react';
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
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-panel rounded-2xl p-5 bg-white border border-[#E4E4DE]">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-[#C53030]" />
            <h2 className="text-lg font-extrabold text-[#181816]">🔐 Security Center & Vulnerability Risk Scanner</h2>
          </div>
          <p className="text-xs text-[#686862] mt-1">
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
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#F7F7F4] text-[#686862] hover:text-[#181816] border border-[#E4E4DE]'
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
              className={`card-panel rounded-2xl p-5 cursor-pointer transition-all duration-200 border text-left bg-white ${
                selectedFinding?.id === item.id 
                  ? 'border-[#171717] bg-[#F7F7F4] shadow-sm' 
                  : 'hover:border-[#96968E]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    item.severity === 'critical' ? 'bg-[#C53030]' :
                    item.severity === 'high' ? 'bg-[#B7791F]' :
                    item.severity === 'medium' ? 'bg-[#315EFB]' : 'bg-[#686862]'
                  }`} />
                  <span className="text-xs font-mono uppercase font-bold text-[#181816]">{item.id}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    item.severity === 'critical' ? 'bg-rose-50 text-[#C53030] border border-rose-200' :
                    item.severity === 'high' ? 'bg-amber-50 text-[#B7791F] border border-amber-200' :
                    'bg-blue-50 text-[#315EFB] border border-blue-200'
                  }`}>
                    {item.severity}
                  </span>
                </div>

                <div className="text-xs font-mono text-[#686862]">
                  {item.file}:{item.line}
                </div>
              </div>

              <h3 className="text-sm font-extrabold text-[#181816] mt-2">{item.title}</h3>
              <p className="text-xs text-[#686862] mt-1 leading-snug">{item.explanation}</p>

              <div className="mt-3 flex items-center justify-between text-[11px] text-[#686862] font-mono pt-2 border-t border-[#E4E4DE]">
                <span>Impact: {item.impact.substring(0, 50)}...</span>
                <span className="text-[#181816] font-bold hover:underline">Inspect Fix →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Vulnerability AI Patch Inspector */}
        <div className="card-panel rounded-3xl p-6 flex flex-col justify-between bg-white border border-[#E4E4DE]">
          {selectedFinding ? (
            <div className="space-y-4 text-xs font-sans">
              <div className="pb-3 border-b border-[#E4E4DE]">
                <span className="text-[10px] uppercase font-bold font-mono text-[#C53030]">Security Vulnerability Inspector</span>
                <h3 className="text-base font-extrabold text-[#181816] mt-1">{selectedFinding.title}</h3>
                <p className="text-[#686862] font-mono text-[11px] mt-0.5">{selectedFinding.file} (Line {selectedFinding.line})</p>
              </div>

              <div>
                <div className="font-bold text-[#181816] mb-1">What is the problem?</div>
                <p className="text-[#686862] leading-relaxed bg-[#F7F7F4] p-3 rounded-xl border border-[#E4E4DE]">
                  {selectedFinding.explanation}
                </p>
              </div>

              <div>
                <div className="font-bold text-[#181816] mb-1">Why does it matter?</div>
                <p className="text-[#C53030] leading-relaxed bg-rose-50 p-3 rounded-xl border border-rose-200">
                  {selectedFinding.impact}
                </p>
              </div>

              <div>
                <div className="font-bold text-[#181816] mb-1">How can I fix it?</div>
                <p className="text-[#16803C] leading-relaxed bg-emerald-50 p-3 rounded-xl border border-emerald-200 font-mono text-[11px]">
                  {selectedFinding.recommendedFix}
                </p>
              </div>

              <button
                onClick={() => onGenerateFix(selectedFinding)}
                className="w-full py-3 rounded-xl bg-[#171717] hover:bg-[#313131] text-white font-extrabold transition shadow-sm flex items-center justify-center space-x-2 text-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>✨ Generate Automated Code Patch</span>
              </button>
            </div>
          ) : (
            <div className="text-xs text-[#686862] text-center my-auto">
              Select a security finding to inspect fix recommendations.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
