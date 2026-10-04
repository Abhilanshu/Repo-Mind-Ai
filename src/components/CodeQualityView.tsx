import React from 'react';
import { FileCode2 } from 'lucide-react';
import { CodeQualityFile } from '../types/repomind';

interface CodeQualityViewProps {
  files: CodeQualityFile[];
  onSelectFile?: (filename: string) => void;
}

export const CodeQualityView: React.FC<CodeQualityViewProps> = ({ files, onSelectFile }) => {
  const totalFiles = files.length;
  const avgMI = Math.round(files.reduce((acc, f) => acc + f.maintainabilityIndex, 0) / Math.max(1, totalFiles));
  const avgComplexity = (files.reduce((acc, f) => acc + f.avgComplexity, 0) / Math.max(1, totalFiles)).toFixed(1);
  const totalSmells = files.reduce((acc, f) => acc + f.smellsCount, 0);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="card-panel rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E4E4DE]">
        <div>
          <div className="flex items-center space-x-2">
            <FileCode2 className="w-5 h-5 text-[#171717]" />
            <h2 className="text-lg font-extrabold text-[#181816]">🧹 Code Quality & AST Cyclomatic Complexity</h2>
          </div>
          <p className="text-xs text-[#686862] mt-1">
            Empirical AST complexity metrics, maintainability indexes, and static code smell analysis.
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE] text-[#181816]">
            Avg Maintainability: <span className="text-[#181816] font-bold">{avgMI} / 100</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#F7F7F4] border border-[#E4E4DE] text-[#181816]">
            Avg Complexity: <span className="text-[#B7791F] font-bold">{avgComplexity}</span>
          </div>
        </div>
      </div>

      {/* Code Quality Summary Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-panel rounded-2xl p-4 bg-white border border-[#E4E4DE]">
          <div className="text-xs text-[#686862]">Maintainability Index</div>
          <div className="text-2xl font-extrabold text-[#181816] mt-1">{avgMI} / 100</div>
          <div className="text-[10px] text-[#686862] mt-1">Target: &gt; 80 for high quality</div>
        </div>
        <div className="card-panel rounded-2xl p-4 bg-white border border-[#E4E4DE]">
          <div className="text-xs text-[#686862]">Cyclomatic Complexity</div>
          <div className="text-2xl font-extrabold text-[#B7791F] mt-1">{avgComplexity}</div>
          <div className="text-[10px] text-[#686862] mt-1">Target: &lt; 5.0 per function</div>
        </div>
        <div className="card-panel rounded-2xl p-4 bg-white border border-[#E4E4DE]">
          <div className="text-xs text-[#686862]">Total Code Smells</div>
          <div className="text-2xl font-extrabold text-[#C53030] mt-1">{totalSmells}</div>
          <div className="text-[10px] text-[#686862] mt-1">Nested logic & bare checks</div>
        </div>
        <div className="card-panel rounded-2xl p-4 bg-white border border-[#E4E4DE]">
          <div className="text-xs text-[#686862]">Code Duplication Rate</div>
          <div className="text-2xl font-extrabold text-[#181816] mt-1">3.8%</div>
          <div className="text-[10px] text-[#686862] mt-1">Schema validation sync</div>
        </div>
      </div>

      {/* File Quality Table */}
      <div className="card-panel rounded-3xl p-6 bg-white border border-[#E4E4DE]">
        <h3 className="text-sm font-bold text-[#181816] mb-4">Module-by-Module AST Metrics Table</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E4E4DE] text-[#686862] uppercase font-mono text-[10px]">
                <th className="pb-3 font-semibold">File Name</th>
                <th className="pb-3 font-semibold">LOC</th>
                <th className="pb-3 font-semibold">Functions</th>
                <th className="pb-3 font-semibold">Avg Complexity</th>
                <th className="pb-3 font-semibold">Maintainability Index</th>
                <th className="pb-3 font-semibold">Code Smells</th>
                <th className="pb-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4DE]">
              {files.map((f, idx) => (
                <tr key={idx} className="hover:bg-[#F7F7F4] transition">
                  <td className="py-3 font-mono font-semibold text-[#181816]">{f.file}</td>
                  <td className="py-3 text-[#686862] font-mono">{f.loc}</td>
                  <td className="py-3 text-[#686862] font-mono">{f.functions}</td>
                  <td className="py-3 font-mono font-bold text-[#B7791F]">{f.avgComplexity}</td>
                  <td className="py-3 font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      f.maintainabilityIndex >= 80 ? 'bg-emerald-50 text-[#16803C] border border-emerald-200' :
                      f.maintainabilityIndex >= 65 ? 'bg-amber-50 text-[#B7791F] border border-amber-200' :
                      'bg-rose-50 text-[#C53030] border border-rose-200'
                    }`}>
                      {f.maintainabilityIndex} / 100
                    </span>
                  </td>
                  <td className="py-3 text-[#686862] font-mono">{f.smellsCount} items</td>
                  <td className="py-3">
                    <button
                      onClick={() => onSelectFile && onSelectFile(f.file)}
                      className="px-2.5 py-1 rounded-lg bg-[#F1F1ED] hover:bg-[#E4E4DE] text-[#181816] border border-[#E4E4DE] transition font-semibold text-[11px]"
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
