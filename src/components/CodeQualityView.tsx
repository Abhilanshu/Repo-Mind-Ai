import React from 'react';
import { FileCode2, AlertTriangle, CheckCircle2, BarChart2, Sparkles, Layers, Sliders } from 'lucide-react';
import { CodeQualityFile } from '../types/repomind';

interface CodeQualityViewProps {
  files: CodeQualityFile[];
  onSelectFile?: (filename: string) => void;
}

export const CodeQualityView: React.FC<CodeQualityViewProps> = ({ files, onSelectFile }) => {
  const totalFiles = files.length;
  const avgMI = Math.round(files.reduce((acc, f) => acc + f.maintainabilityIndex, 0) / Math.max(1, totalFiles));
  const avgComplexity = (files.reduce((acc, f) => acc + f.avgComplexity, 0) / Math.max(1, totalFiles)).toFixed(2);
  const totalSmells = files.reduce((acc, f) => acc + f.smellsCount, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileCode2 className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-extrabold text-white">🧹 Code Quality Intelligence & AST Analysis</h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Empirical AST complexity metrics, maintainability indexes, and static code smell analysis.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300">
            Avg Maintainability: <span className="text-white font-bold">{avgMI} / 100</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300">
            Avg Cyclomatic Complexity: <span className="text-amber-400 font-bold">{avgComplexity}</span>
          </div>
        </div>
      </div>

      {/* Code Quality Summary Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400">Maintainability Index</div>
          <div className="text-2xl font-extrabold text-purple-300 mt-1">{avgMI} / 100</div>
          <div className="text-[10px] text-slate-400 mt-1">Goal: &gt; 80 for optimal refactoring</div>
        </div>
        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400">Cyclomatic Complexity</div>
          <div className="text-2xl font-extrabold text-amber-400 mt-1">{avgComplexity}</div>
          <div className="text-[10px] text-slate-400 mt-1">Goal: &lt; 5.0 per function</div>
        </div>
        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400">Total Code Smells</div>
          <div className="text-2xl font-extrabold text-rose-400 mt-1">{totalSmells}</div>
          <div className="text-[10px] text-slate-400 mt-1">God functions & magic numbers</div>
        </div>
        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400">Code Duplication Rate</div>
          <div className="text-2xl font-extrabold text-indigo-300 mt-1">4.2%</div>
          <div className="text-[10px] text-slate-400 mt-1">Job manager rendering sync</div>
        </div>
      </div>

      {/* File Quality Table */}
      <div className="glass-panel rounded-3xl p-6">
        <h3 className="text-sm font-bold text-white mb-4">Module-by-Module AST Metrics Table</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-purple-900/40 text-purple-300 uppercase font-mono text-[10px]">
                <th className="pb-3 font-semibold">File Name</th>
                <th className="pb-3 font-semibold">LOC</th>
                <th className="pb-3 font-semibold">Functions</th>
                <th className="pb-3 font-semibold">Avg Complexity</th>
                <th className="pb-3 font-semibold">Maintainability Index</th>
                <th className="pb-3 font-semibold">Code Smells</th>
                <th className="pb-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30">
              {files.map((f, idx) => (
                <tr key={idx} className="hover:bg-purple-950/40 transition">
                  <td className="py-3 font-mono font-semibold text-slate-200">{f.file}</td>
                  <td className="py-3 text-slate-300 font-mono">{f.loc}</td>
                  <td className="py-3 text-slate-300 font-mono">{f.functions}</td>
                  <td className="py-3 font-mono font-bold text-amber-400">{f.avgComplexity}</td>
                  <td className="py-3 font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      f.maintainabilityIndex >= 80 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      f.maintainabilityIndex >= 65 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                      'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    }`}>
                      {f.maintainabilityIndex} / 100
                    </span>
                  </td>
                  <td className="py-3 text-slate-300 font-mono">{f.smellsCount} items</td>
                  <td className="py-3">
                    <button
                      onClick={() => onSelectFile && onSelectFile(f.file)}
                      className="px-2.5 py-1 rounded-lg bg-purple-950/80 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-700/40 transition font-semibold text-[11px]"
                    >
                      Inspect →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
